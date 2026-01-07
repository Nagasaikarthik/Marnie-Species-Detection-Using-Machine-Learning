import React from 'react';
import './speciesinfo.css';
import fish from './assets/fish.jpg';
import shark from './assets/shark.jpg';
import dolphin from './assets/dolphin.jpg';
import penguin from './assets/penguin.jpg';
import turtle from './assets/turtle.jpg';
import whale from './assets/whale.jpg';

const SpeciesInfo = () => {
  return (
    <div className="species-info" id="species-info">
      <h2>Explore Marine Species</h2>
      <div className="species-cards">
        <div className="card">
          <img src={fish} alt="Fish" />
          <h3>Fish</h3>
          <p>Marine species found in oceans and freshwater.</p>
          <div className="description">A variety of species with vital ecological roles.</div>
        </div>

        <div className="card">
          <img src={shark} alt="Shark" />
          <h3>Shark</h3>
          <p>Predators of the ocean, highly important to the ecosystem.</p>
          <div className="description">Keystone species essential for maintaining marine balance.</div>
        </div>

        <div className="card">
          <img src={dolphin} alt="Dolphin" />
          <h3>Dolphin</h3>
          <p>Highly intelligent and social marine mammals.</p>
          <div className="description">Famous for their playful nature and complex communication.</div>
        </div>

        <div className="card">
          <img src={penguin} alt="Penguin" />
          <h3>Penguin</h3>
          <p>Flightless birds that are perfectly adapted to marine life.</p>
          <div className="description">Adapted to cold waters and exceptional swimmers.</div>
        </div>

        <div className="card">
          <img src={turtle} alt="Turtle" />
          <h3>Turtle</h3>
          <p>Long-lived reptiles known for their hard shells and slow movement.</p>
          <div className="description">Ancient travelers of the oceans.</div>
        </div>

        <div className="card">
          <img src={whale} alt="Whale" />
          <h3>Whale</h3>
          <p>The largest mammals on Earth, playing a key role in marine ecosystems.</p>
          <div className="description">Massive creatures that shape marine food chains.</div>
        </div>
      </div>
    </div>
  );
}

export default SpeciesInfo;
