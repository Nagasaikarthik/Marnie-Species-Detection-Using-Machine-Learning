// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import ModelSelect from './components/ModelSelect';

// import dolphin from './assets/dolphin.jpg';
// import fish from './assets/fish.jpg';
// import penguin from './assets/penguin.jpg';
// import shark from './assets/shark.jpg';
// import turtle from './assets/turtle.jpg';
// import whale from './assets/whale.jpg';

// function App() {
//   const [uploadedImageFile, setUploadedImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [selectedModel, setSelectedModel] = useState('');
//   const canvasRef = useRef(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploadedImageFile(file);
//       setUploadedImageUrl(URL.createObjectURL(file));
//       setPredictions([]);
//     }
//   };

//   const handleDetectClick = async () => {
//     if (!selectedModel) {
//       alert("Please select a model before detecting.");
//       return;
//     }

//     if (!uploadedImageFile) {
//       alert("Please upload an image first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', uploadedImageFile);

//     try {
//       const res = await fetch('http://localhost:8000/predict', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       console.log(data)
//       setPredictions(data.predictions || []);
//     } catch (error) {
//       console.error('Prediction error:', error);
//       alert('Failed to get predictions from the server.');
//     }
//   };

//   useEffect(() => {
//     if (!uploadedImageUrl || predictions.length === 0) {return;}

//     const img = new Image();
//     img.src = uploadedImageUrl;

//     img.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       predictions.forEach(pred => {
//         const { xmin, ymin, xmax, ymax, confidence, name } = pred;

//         ctx.strokeStyle = 'red';
//         ctx.lineWidth = 2;
//         ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
//         ctx.fillStyle = 'red';
//         ctx.font = '16px Arial';
//         ctx.fillText(`${name} (${(confidence * 100).toFixed(1)}%)`, xmin, ymin - 5);
//       });
//     };
//   }, [uploadedImageUrl, predictions]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="App">
//       <Header />
//       <h1 className="heading" id="home">Marine Species Detection</h1>
//       <Navbar />

//       <section className="video-section">
//         <video className="background-video" autoPlay loop muted>
//           <source src="/shark-video.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </section>

//       <div className="species-info" id="species-info">
//         <h2>Explore Marine Species</h2>
//         <div className="species-cards">
//           <div className="card"><img src={fish} alt="Fish" /><h3>Fish</h3><p>Marine species found in oceans and freshwater.</p></div>
//           <div className="card"><img src={shark} alt="Shark" /><h3>Shark</h3><p>Predators of the ocean, highly important to the ecosystem.</p></div>
//           <div className="card"><img src={dolphin} alt="Dolphin" /><h3>Dolphin</h3><p>Highly intelligent and social marine mammals.</p></div>
//           <div className="card"><img src={penguin} alt="Penguin" /><h3>Penguin</h3><p>Flightless birds that are perfectly adapted to marine life.</p></div>
//           <div className="card"><img src={turtle} alt="Turtle" /><h3>Turtle</h3><p>Long-lived reptiles known for their hard shells and slow movement.</p></div>
//           <div className="card"><img src={whale} alt="Whale" /><h3>Whale</h3><p>The largest mammals on Earth, playing a key role in marine ecosystems.</p></div>
//         </div>
//       </div>

//       <div className="upload-section" id="upload-section">
//         <h3>Upload Your Image</h3>
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//         {uploadedImageFile && <p className="uploaded-filename">Uploaded file: {uploadedImageFile.name}</p>}
//       </div>

//       <div id="model-select">
//         <ModelSelect setSelectedModel={setSelectedModel} />
//       </div>

//       <div className="detect-btn-container">
//         <button className="detect-btn" onClick={handleDetectClick}>Detect</button>
//       </div>

//       {uploadedImageUrl && (
//         <div className="canvas-container">
//           <canvas ref={canvasRef}></canvas>
//         </div>
//       )}

//       {predictions.length > 0 && (
//         <div className="predictions">
//           <h4>Predictions:</h4>
//           <ul>
//             {predictions.map((pred, idx) => (
//               <li key={idx}>
//                 <strong>{pred.name}</strong> – {(pred.confidence * 100).toFixed(2)}%
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ModelSelect from './components/ModelSelect';
import DetectionResult from './components/DetectionResult';  // Import DetectionResult

import dolphin from './assets/dolphin.jpg';
import fish from './assets/fish.jpg';
import penguin from './assets/penguin.jpg';
import shark from './assets/shark.jpg';
import turtle from './assets/turtle.jpg';
import whale from './assets/whale.jpg';

function App() {
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [result, setResult] = useState(null);  // Change from predictions array to result object
  const [selectedModel, setSelectedModel] = useState('');
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImageFile(file);
      setUploadedImageUrl(URL.createObjectURL(file));
      setResult(null);  // Reset result when new image uploaded
    }
  };

  const handleDetectClick = async () => {
    if (!selectedModel) {
      alert("Please select a model before detecting.");
      return;
    }

    if (!uploadedImageFile) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedImageFile);

    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setResult(data);  // Set entire response as result
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to get predictions from the server.');
    }
  };

  // Optional: You can keep canvas to show uploaded image only
  // useEffect(() => {
  //   if (!uploadedImageUrl) return;

  //   const img = new Image();
  //   img.src = uploadedImageUrl;

  //   img.onload = () => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.drawImage(img, 0, 0);
  //   };
  // }, [uploadedImageUrl]);

useEffect(() => {
  if (!uploadedImageUrl) return;

  const img = new Image();
  img.src = uploadedImageUrl;

  img.onload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const maxWidth = 500; // max width you want to show on canvas
    let scale = 1;

    if (img.width > maxWidth) {
      scale = maxWidth / img.width;
    }

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}, [uploadedImageUrl]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Header />
      <h1 className="heading" id="home">Marine Species Detection</h1>
      <Navbar />

      <section className="video-section">
        <video className="background-video" autoPlay loop muted>
          <source src="/shark-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <div className="species-info" id="species-info">
        <h2>Explore Marine Species</h2>
        <div className="species-cards">
          <div className="card"><img src={fish} alt="Fish" /><h3>Fish</h3><p>Marine species found in oceans and freshwater.</p></div>
          <div className="card"><img src={shark} alt="Shark" /><h3>Shark</h3><p>Predators of the ocean, highly important to the ecosystem.</p></div>
          <div className="card"><img src={dolphin} alt="Dolphin" /><h3>Dolphin</h3><p>Highly intelligent and social marine mammals.</p></div>
          <div className="card"><img src={penguin} alt="Penguin" /><h3>Penguin</h3><p>Flightless birds that are perfectly adapted to marine life.</p></div>
          <div className="card"><img src={turtle} alt="Turtle" /><h3>Turtle</h3><p>Long-lived reptiles known for their hard shells and slow movement.</p></div>
          <div className="card"><img src={whale} alt="Whale" /><h3>Whale</h3><p>The largest mammals on Earth, playing a key role in marine ecosystems.</p></div>
        </div>
      </div>

      <div className="upload-section" id="upload-section">
        <h3>Upload Your Image</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploadedImageFile && <p className="uploaded-filename">Uploaded file: {uploadedImageFile.name}</p>}
      </div>

      <div id="model-select">
        <ModelSelect setSelectedModel={setSelectedModel} />
      </div>

      <div className="detect-btn-container">
        <button className="detect-btn" onClick={handleDetectClick}>Detect</button>
      </div>

      {uploadedImageUrl && (
        <div className="canvas-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      )}

      {/* Show DetectionResult component and pass result prop */}
      {result && <DetectionResult result={result} />}

      <Footer />
    </div>
  );
}

export default App;
