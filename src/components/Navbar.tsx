import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import '../pages/About';

function Navbar() {
  return (
    <div className="navbar">
      <Link className="navbar-link" to="/">
        Home
      </Link>
      <Link className="navbar-link" to="map">
        Map
      </Link>
      <Link className="navbar-link" to="About">
        About
      </Link>
      <Link className="navbar-link" to="Reviews">
        Reviews
      </Link>
    </div>
  );
}

export default Navbar;
