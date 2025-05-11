import React from 'react'
import { Link } from 'react-router-dom'
import { FaPaw, FaHeartbeat, FaShoppingCart, FaHandHoldingHeart } from "react-icons/fa"; // Import icons

const services = [
  {
    icon: <FaPaw />,
    title: "Pet Adoption",
    description: "Helping pets find loving homes through a simple and transparent adoption process.",
    bgColor: "#FFD700"
  },
  {
    icon: <FaHeartbeat />,
    title: "Pet Health Assessment",
    description: "Ensuring your pet’s well-being with health screenings and disease prediction services.",
    bgColor: "#90EE90",
    link: "http://localhost:5175/symptom"
  },
  {
    icon: <FaShoppingCart />,
    title: "Pet Supply Shop",
    description: "Providing high-quality pet essentials, from food to toys, for a happy and healthy pet.",
    bgColor: "#BA55D3",
    link: "http://localhost:5176/"
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Donation",
    description: "Support homeless pets by contributing to our donation campaigns and sponsorship programs.",
    bgColor: "#ADD8E6",
    link: "http://localhost:5177/campaignlist"
  }
];


function HeroSection() {
  return (
    <>  {/* FIX: Wrap everything in a Fragment */}
      <section className='hero'>
        <img src='/hero.jpg' alt='hero' />
        <div className="overlay">
          <h1>Find Your Best Friend at the Animal Shelter</h1>
          <p>Your trusted partner in pet adoption, health, and happiness.</p>
          <Link to='Pets' spy={true} smooth={true} duration={500}>Learn More</Link>
        </div>
      </section>

      <section className="services">
        {services.map((service, index) => (
          service.link ? (
            <a key={index} href={service.link} className="service-card" style={{ backgroundColor: service.bgColor }}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </a>
          ) : (
            <div key={index} className="service-card" style={{ backgroundColor: service.bgColor }}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          )
        ))}
      </section>
      <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Your Trusted Partner in Pet Adoption, Health, and Happiness.</h1>
        <p className="hero-description">
        Connecting pets with loving families while ensuring their health and well-being. Join us in making a difference—one paw at a time!
        </p>
        <button className="cta-button">Get Started</button>
      </div>
      <div className="hero-images">
        
        <img src='/vertical-shot-cute-dog-sitting-fluffy-white-fabric.jpg' alt='hero' className="sub-img"/>
        <img src='/full-shot-women-petting-dog.jpg' alt='hero' className="main-img"/>
      </div>
    </section>
    <div className="hero2">
    <img src="/paw.png" class="paw-prints paw1" alt="Paw Print"/>
  <img src="/paw.png" class="paw-prints paw2" alt="Paw Print"/>
  <img src="/paw.png" class="paw-prints paw3" alt="Paw Print"/>
  <img src="/paw.png" class="paw-prints paw4" alt="Paw Print"/>
    
      <h1>Your Support, Their Second Chance at a Happier, Healthier Life</h1>
      <p>
        Consequat tempus metus nulla convallis ipsum curae sagittis aenean enim. Blandit ligula nostra dolor elit lacinia.
      </p>
      <button className="donate-btn">Donate Now</button>
      <img src='/hero2.png' alt='hero2' />
    </div>
    
    
    <section className="adoption-container">
      <div className="adoption-text">
        <h2>Getting Ready for a New Furry Family Member</h2>
        <p>
          Bringing a pet home is a life-changing experience filled with love and joy. Ensuring a smooth transition requires preparation, understanding, and commitment. Follow these essential steps to welcome your new companion with confidence.
        </p>
        <button className="adoption-btn">Discover more</button>
      </div>
      
      <div className="adoption-cards">
        <div className="card">
          <h3>✅ Care Requirements</h3>
          <p>Every pet has unique needs, from daily exercise to proper nutrition. Learn about feeding schedules, grooming tips, and health check-ups.</p>
        </div>
        <div className="card">
          <h3>✅ Financial Considerations</h3>
          <p>Owning a pet is a long-term financial commitment. Plan ahead for food, veterinary care, and grooming.</p>
        </div>
        <div className="card">
          <h3>✅ Essential Pet Supplies</h3>
          <p>Prepare for your pet’s arrival by gathering the must-have supplies like a bed, food, water bowls, and toys.</p>
        </div>
        <div className="card">
          <h3>✅ Adoption Application</h3>
          <p>Complete our adoption application to find the perfect pet match for your home and lifestyle.</p>
        </div>
      </div>
    </section>

     

      
    <section className='hero'>
        <img src='/finalhome.jpg' alt='hero' />
        <div className="overlay">
          <h1>Share your love with the pets in need of a home</h1>
          <p>Your trusted partner in pet adoption, health, and happiness.</p>
          
        </div>
      </section>
    </>

  );
}

export default HeroSection;

