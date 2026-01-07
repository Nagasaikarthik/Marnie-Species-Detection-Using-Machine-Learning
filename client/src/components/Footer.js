import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Marine Species Detection</h3>
        <p className="footer-description">
          Discover the wonders of marine life and help in ocean conservation with our advanced detection models, such as YOLO and Faster R-CNN.
        </p>
        
        <div className="footer-links">
          <a href="#about" className="footer-link">About Us</a>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
        
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
        </div>

        <p className="footer-note">© 2024 Marine Species Detection. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
