import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          Marine Explorer
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="home" smooth={true} duration={500} offset={-70}>
              Home
            </Link>
          </li>
          <li>
            <Link to="species-info" smooth={true} duration={500} offset={-70}>
              Species
            </Link>
          </li>
          <li>
            <Link to="upload-section" smooth={true} duration={500} offset={-70}>
              Upload Image
            </Link>
          </li>
          <li>
            <Link to="model-select" smooth={true} duration={500} offset={-70}>
              AI Models
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
