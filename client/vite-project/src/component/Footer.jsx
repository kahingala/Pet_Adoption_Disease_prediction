import React from 'react'

function Footer() {
  return (
    <footer class="footer">
  <div class="footer-container">
    <div class="footer-section">
      <h3>About Us</h3>
      <p>We are dedicated to helping pets find loving homes and providing quality pet care resources.</p>
    </div>
    <div class="footer-section">
      <h3>Quick Links</h3>
      <p><a href="#">Home</a></p>
      <p><a href="#">Adopt a Pet</a></p>
      <p><a href="#">Donate</a></p>
      <p><a href="#">Contact Us</a></p>
    </div>
    <div class="footer-section">
      <h3>Follow Us</h3>
      <div class="social-icons">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; 2025 PetAdopt | All Rights Reserved.
  </div>
</footer>

  )
}

export default Footer