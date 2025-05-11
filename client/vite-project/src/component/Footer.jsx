import React from 'react';
//import './App.css'; // Ensure you import the CSS file

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-container'>
        {/* Left Column - About */}
        <div className='footer-section'>
          <h3>About Us</h3>
          <p>
            Pow Pet Care is dedicated to providing high-quality products for your pets. From nutritious food to fun toys, we ensure every item is crafted with care and love.
          </p>
        </div>

        {/* Middle Column - Company */}
        <div className='footer-section'>
          <h3>Company</h3>
          <ul>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About Us</a></li>
            <li><a href='#'>Delivery</a></li>
            <li><a href='#'>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Column - Get in Touch */}
        <div className='footer-section'>
          <h3>Get in Touch</h3>
          <ul>
            <li>Phone: +1-212-456-7890</li>
            <li>Email: <a href='mailto:contact@pow.com'>contact@pow.com</a></li>
            <li>Support: <a href='mailto:support@pow.com'>support@pow.com</a></li>
          </ul>
          
          {/* Social Icons */}
          <div className='social-icons'>
            <a href='#'><i className='fab fa-facebook'></i></a>
            <a href='#'><i className='fab fa-twitter'></i></a>
            <a href='#'><i className='fab fa-instagram'></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='footer-bottom' style={{ textAlign: 'center' }}>
        © 2025 Pow Pet Care. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
