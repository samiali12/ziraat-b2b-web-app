import React from 'react';
import BannerImage from '../../assets/img/banner.jpg'

const BannerSection = () => {
  return (
    < section className=" text-gray-700 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">Empowering Agriculture Businesses</h1>
        <p className="text-lg mb-8">Connecting Farmers, Suppliers, and Distributors for a Prosperous Future</p>
        <a
          href="#contact"
          className="bg-[#28844b] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#28844be1] transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default BannerSection;
