🐠 Marine Species Detection Using Machine Learning

This project focuses on automated detection and localization of marine species in aquarium environments using deep learning–based object detection models. The work compares Faster R-CNN and YOLOv5 to study the trade-off between accuracy and real-time performance 

📌 Problem Statement
------------------------------------------------------------------------------------------------------------------

Marine biodiversity monitoring is challenging due to:

1.Poor underwater visibility

2.Lighting variations and water distortion

3.Occlusion and overlapping species

4.Manual identification is time-consuming and error-prone. This project aims to automate marine species detection using computer vision techniques.

🎯 Objectives
----------------------------------------------------------------------------------------------------------------------
1.Detect and localize marine species in aquarium images

2.Compare Faster R-CNN and YOLOv5

3.Evaluate models using mAP, FPS, IoU, Precision, and Recall

4.Study suitability for real-time vs high-accuracy applications

📂 Dataset
----------------------------------------------------------------------------------------------------------------------
Aquarium Dataset (Roboflow)

Annotated images of:

Fish

Jellyfish

Turtles

Includes real-world challenges like occlusion, lighting variation, and cluttered backgrounds

🧠 Models Used
----------------------------------------------------------------------------------------------------------------------
🔹 Faster R-CNN

Two-stage detector (Region Proposal + Classification)

High precision for small and occluded objects

Slower inference speed

🔹 YOLOv5

Single-stage detector

Fast, real-time object detection

Slight trade-off in precision for speed

🧪 Data Preprocessing & Augmentation
----------------------------------------------------------------------------------------------------------------------

Image resizing (600 × 600)

Horizontal & vertical flipping

Brightness and contrast adjustments

Color jittering

📊 Evaluation Metrics
----------------------------------------------------------------------------------------------------------------------
1.Mean Average Precision (mAP)

2.Frames Per Second (FPS)

3.Intersection over Union (IoU)

4.Precision & Recall

📈 Results Summary
----------------------------------------------------------------------------------------------------------------------
Model	            mAP (%)	  FPS	  IoU
Faster R-CNN	    92.5	    28	  0.92
YOLOv5	          93.6	    62	  0.91

Key Insight:
----------------------------------------------------------------------------------------------------------------------
Faster R-CNN → Better accuracy

YOLOv5 → Better real-time performance


🌐 Deployment
----------------------------------------------------------------------------------------------------------------------

A web-based application (Marine Explorer) was developed where users can:

Upload an image

Detect marine species

View bounding boxes and predicted labels

YOLOv5 is preferred for real-time inference, while Faster R-CNN supports precise detection.

🚀 Future Improvements
----------------------------------------------------------------------------------------------------------------------

Expand dataset with more species and environments

Handle class imbalance

Explore YOLOv8 and transformer-based detectors

Improve underwater image enhancement techniques

🛠️ Technologies Used
----------------------------------------------------------------------------------------------------------------------

Python

PyTorch

Faster R-CNN

YOLOv5

Roboflow

OpenCV

React (Frontend)

👨‍💻 Author : G Naga Sai Karthik 
