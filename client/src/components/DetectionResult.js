import React from "react";

function DetectionResult({ result }) {
  if (!result) {
    return (
      <div className="detection-result">Detection result will appear here.</div>
    );
  }

  const { most_frequent } = result;

  return (
    <div className="detection-result" >
      <h3>Detected Animal</h3>
      <p>{most_frequent.animal} </p>
    </div>
  );
}

export default DetectionResult;
