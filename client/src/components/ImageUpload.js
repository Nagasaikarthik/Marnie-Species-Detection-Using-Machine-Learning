import React, { useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs'; // TensorFlow.js
import './ImageUpload.css';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // For loader state

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = () => runPrediction(img);
    setImage(img);
    setIsLoading(true); // Show loader
  };

  const runPrediction = async (img) => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(img);
    setPrediction(predictions);
    setIsLoading(false); // Hide loader after predictions
  };

  return (
    <div className="upload-section">
      <h3>Upload an Image to Detect Species</h3>
      <label htmlFor="image-upload">Choose an image</label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
      />
      
      {image && <img src={image.src} alt="Uploaded" />}
      
      {isLoading && <div className="loader active">Processing...</div>}

      {prediction && (
        <div className="predictions">
          <h3>Predictions:</h3>
          <ul>
            {prediction.map((pred, idx) => (
              <li key={idx}>
                <span>{pred.class}:</span> {Math.round(pred.score * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
