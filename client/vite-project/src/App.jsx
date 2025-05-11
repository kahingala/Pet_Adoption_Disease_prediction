import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import Navbar from './component/Navbar';
import HeroSection from './component/HeroSection';
import Services from './component/Services';
import About from './component/About';
import Contact from './component/Contact';
import { Toaster } from 'react-hot-toast';
import Footer from './component/Footer';
import Pets from './component/Pets';
import Shop from './component/Shop';

function App() {
  return (
    <Router>
      <Navbar />
      
      {/* Use Routes instead of Switch in v6 */}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/shop" element={<Shop />} />
        {/* Add more routes as needed */}
      </Routes>

      <Footer />
      
      <Toaster />
    </Router>
  );
}

export default App;
