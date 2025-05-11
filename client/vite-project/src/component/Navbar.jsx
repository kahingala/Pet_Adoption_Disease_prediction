import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../asset/logo.png'; // Correct path with forward slashes

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logoImage} alt="Pet Care Logo" style={{ maxWidth: '50px', height: 'auto' }} />
      <div className="nav-links">
        
        <Link className="nav-link" to="/" spy={"true"} smooth={"true"} duration={500}>Home</Link>
        <Link className="nav-link" to="/pets" spy={"true"} smooth={"true"} duration={500}>Pets</Link>
        <Link className="nav-link" to="http://localhost:5176/" spy={"true"} smooth={"true"} duration={500}>Pet Shop</Link>
        <Link className="nav-link" to="/services" spy={"true"} smooth={"true"} duration={500}>Services</Link>
        <Link className="nav-link" to="/about" spy={true} smooth={true} duration={500}>About</Link>
        <Link className="nav-link" to="Contact" spy={"true"} smooth={"true"} duration={500}>Contact</Link>
        
        {/* Donation Button */}
      <Link to="/donate" className="donate-button">
        Donate
      </Link>
      </div>
    </nav>

  )
}

export default Navbar