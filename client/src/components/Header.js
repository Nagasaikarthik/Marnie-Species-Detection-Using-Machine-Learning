import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Fullscreen Background Video */}
      <video className="background-video" autoPlay loop muted>
        <source src="/shark-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for darkening the video */}
      <div className="overlay"></div>

      {/* Header content */}
      <div className="header-content">
        <h1 className="header-title">Marine Species Detection</h1>
        <p className="header-subtitle">Unleashing the power of AI to explore the ocean</p>
        <a href="#species-info" className="header-button">Explore Species</a>
      </div>
    </header>
  );
};

export default Header;
