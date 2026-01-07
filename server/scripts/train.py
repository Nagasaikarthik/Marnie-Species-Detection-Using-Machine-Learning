import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # server/
YOLOV5_TRAIN_PATH = os.path.join(BASE_DIR, 'yolov5', 'train.py')
DATA_YAML = os.path.join(BASE_DIR, 'dataset', 'aquarium', 'data.yaml')
WEIGHTS_PATH = os.path.join(BASE_DIR, 'yolov5s.pt')  # or use full path if elsewhere

command = (
    f"python {YOLOV5_TRAIN_PATH} "
    f"--img 640 "
    f"--batch 16 "
    f"--epochs 50 "
    f"--data \"{DATA_YAML}\" "
    f"--weights \"{WEIGHTS_PATH}\" "
    f"--name aquarium-exp"
)

os.system(command)
