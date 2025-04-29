import React from 'react';

const Footer = () => {
  return (
    <div className='p-8 bg-[#B99976]'
>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start text-center md:text-left gap-8'>
        {/* Left Column - About */}
        <div className='flex flex-col items-center md:items-start w-1/3'>
          <h2 className='text-xl font-bold mb-4'>About Us</h2>
          <p className='text-gray-600'>
            Pow Pet Care is dedicated to providing high-quality products for your pets. From nutritious food to fun toys, we ensure every item is crafted with care and love.
          </p>
        </div>

        {/* Middle Column - COMPANY */}
        <div className='flex flex-col items-center md:items-start w-1/3'>
          <h2 className='text-xl font-bold mb-4'>Company</h2>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Column - GET IN TOUCH */}
        <div className='flex flex-col items-center md:items-start w-1/3'>
          <h3 className='text-xl font-bold mb-4'>Get in Touch</h3>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Phone: +1-212-456-7890</li>
            <li>Email: contact@pow.com</li>
            <li>Support: support@pow.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className='max-w-6xl mx-auto text-center text-gray-500 text-sm mt-8'>
        © 2025 Pow Pet Care. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
