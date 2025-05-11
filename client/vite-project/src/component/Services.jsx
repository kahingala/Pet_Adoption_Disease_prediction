import React from 'react';
import './Services.css';

function Services() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <img src="/Services.jpg" alt="Services" className="hero-bg" />
        <div className="overlay">
          <h1>Services</h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="service-section">
        <h2 className="service-heading">Providing Comprehensive Care for Every Pet in Need</h2>
        <p className="service-description">
          Our services ensure that each pet receives the love, care, and medical attention they deserve, 
          while making the adoption process seamless and stress-free.
        </p>
      </section>
      

      {/* Services List */}
      <section className="service-container">
        {/* Pet Adoption */}
        <div className="service-box adoption">
          <div className="service-content">
            <h3 className="service-title">Pet Adoption</h3>
            <p className="service-description">
              Give a loving home to a pet in need. We ensure a smooth and safe adoption process, 
              connecting pets with caring families.
            </p>
            <button className="service-button">Learn More</button>
          </div>
          <img src="/full-shot-women-petting-dog.jpg" alt="Pet Adoption" />
        </div>

        {/* Pet Health Prediction */}
        <div className="service-box health">
          <div className="service-content">
            <h3 className="service-title">Pet Health Prediction</h3>
            <p className="service-description">
              Predict and prevent potential health issues with our AI-driven health prediction tool for pets.
            </p>
            <a href="http://localhost:5175/symptom" className="service-button">Learn More</a>
          </div>
          <img src="/full-shot-women-petting-dog.jpg" alt="Pet Health Prediction" />
        </div>

        {/* Pet Supplies */}
        <div className="service-box supplies">
          <div className="service-content">
            <h3 className="service-title">Pet Supplies</h3>
            <p className="service-description">
              Everything your pet needs in one place! High-quality food, accessories, and healthcare products.
            </p>
            <button className="service-button">Shop Now</button>
          </div>
          <img src="/full-shot-women-petting-dog.jpg" alt="Pet Supplies" />
        </div>

        {/* Donation */}
        <div className="service-box donation">
          <div className="service-content">
            <h3 className="service-title">Donation</h3>
            <p className="service-description">
              Donate to help provide food, shelter, and medical care for rescued pets in need.
            </p>
            <button className="service-button">Donate Now</button>
          </div>
          <img src="/full-shot-women-petting-dog.jpg" alt="Donation" />
        </div>
      </section>
    </>
  );
}

export default Services;
