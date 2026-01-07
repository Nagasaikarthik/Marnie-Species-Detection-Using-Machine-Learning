import React from 'react';

function ModelSelect({ setSelectedModel }) {
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value); // Update selected model
  };

  return (
    <div className="model-select-container">
      <h3>Select AI Model</h3>
      <select onChange={handleModelChange} className="model-select">
        <option value="">--Select Model--</option>
        <option value="Model 1">  Faster R cnn</option>
        <option value="Model 2">YOLO MODEL</option>
      </select>
    </div>
  );
}

export default ModelSelect;
