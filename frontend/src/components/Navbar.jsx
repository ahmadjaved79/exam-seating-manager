import React from 'react';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo and Title */}
          <div className="navbar-brand">
            <img
              className="navbar-logo"
              src="https://res.cloudinary.com/dcmt06mac/image/upload/v1744523819/logo_zrh6oy.jpg"
              alt="College Logo"
            />
            <span className="navbar-title">
             Andhra Loyola Institute of Engineering and Technology
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
