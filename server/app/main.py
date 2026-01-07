import io
import os
import torch
from fastapi import FastAPI, UploadFile, File
from torchvision import transforms
from torchvision.models.detection import fasterrcnn_mobilenet_v3_large_fpn
from torchvision.utils import draw_bounding_boxes
from PIL import Image
import torchvision.transforms.functional as F
import numpy as np
from fastapi.responses import StreamingResponse
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from collections import Counter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model (make sure it matches what you trained)
n_classes = 9  # 8 classes + background
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = fasterrcnn_mobilenet_v3_large_fpn(pretrained=False)
in_features = model.roi_heads.box_predictor.cls_score.in_features
model.roi_heads.box_predictor = FastRCNNPredictor(in_features, n_classes)

# Use os to dynamically resolve the model path
base_dir = os.path.dirname(os.path.abspath(__file__))  # Absolute path to this file's directory
model_path = os.path.join(base_dir, "model", "fasterrcnn_trained.pth")

# Load trained weights
state_dict = torch.load(model_path, map_location=device)

# Optional: remove 'module.' prefix if trained with DataParallel
if any(key.startswith('module.') for key in state_dict.keys()):
    from collections import OrderedDict
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        new_state_dict[k.replace('module.', '')] = v
    state_dict = new_state_dict

model.load_state_dict(state_dict)
model.to(device)
model.eval()

# Define class labels (same as used during training)
class_labels = ['Fish', 'Jellyfish', 'Penguin', 'Puffin', 'Seahorse', 'Shark', 'Starfish', 'Stingray']

@app.get("/")
async def welcome():
    return {"message": "Welcome to Marine API"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # Convert to tensor
    image_tensor = F.to_tensor(image).to(device)

    with torch.no_grad():
        prediction = model([image_tensor])[0]

    # Filter predictions with score > threshold
    threshold = 0.5
    scores = prediction['scores']
    boxes = prediction['boxes'][scores > threshold]
    labels = prediction['labels'][scores > threshold]

    # Get animal names
    detected_animals = [class_labels[i - 1] for i in labels]  # Adjust for 1-indexing

    if not detected_animals:
        return {
            "message": "No animals detected",
            "detected_animals": [],
            "count": 0,
            "most_frequent": None
        }

    # Count frequencies
    animal_counts = Counter(detected_animals)
    most_common_animal, count = animal_counts.most_common(1)[0]

    return {
        "detected_animals": detected_animals,
        "count": len(detected_animals),
        "most_frequent": {
            "animal": most_common_animal,
            "occurrences": count
        }
    }