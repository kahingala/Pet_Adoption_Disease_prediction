import React from 'react';
import { FaPaw, FaHeartbeat, FaShoppingCart, FaHandHoldingHeart, FaBullseye, FaGlobe } from "react-icons/fa";

const services = [
  {
    icon: <FaPaw />,
    title: "Pet Adoption",
    description: "Helping pets find loving homes through a simple and transparent adoption process.",
    bgColor: "#FFD700"
  },
  {
    icon: <FaHeartbeat />,
    title: "Pet Health & Assessment",
    description: "Ensuring your pet’s well-being with health screenings and disease prediction services.",
    bgColor: "#90EE90"
  },
  {
    icon: <FaShoppingCart />,
    title: "Pet Supply Shop",
    description: "Providing high-quality pet essentials, from food to toys, for a happy and healthy pet.",
    bgColor: "#BA55D3"
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Donation",
    description: "Support homeless pets by contributing to our donation campaigns and sponsorship programs.",
    bgColor: "#ADD8E6"
  }
];

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <img src="/about-hero.jpg" alt="About Us" className="hero-bg" />
        <div className="overlay">
          <h1>About Us</h1>
        </div>
      </section>

      {/* About Description */}
      <section className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Your Trusted Partner in Pet Adoption, Health, and Happiness.</h1>
          <p className="hero-description">
            Connecting pets with loving families while ensuring their health and well-being. 
            Join us in making a difference—one paw at a time!
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-images">
          <img src='/vertical-shot-cute-dog-sitting-fluffy-white-fabric.jpg' alt='Dog' className="sub-img" />
          <img src='/full-shot-women-petting-dog.jpg' alt='Woman Petting Dog' className="main-img" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        {services.map((service, index) => (
          <div key={index} className="service-card" style={{ backgroundColor: service.bgColor }}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>

      
    </>
  );
}

export default About;
