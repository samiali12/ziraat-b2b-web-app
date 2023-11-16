import React from 'react';
import BannerImage from '../../assets/img/banner.jpg'
import SearchBar from '../component/SearchBar';

const HeroSection = () => {
  return (
    < section className=" text-gray-700 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">Empowering Agriculture Businesses</h1>
        <p className="text-lg mb-8">Connecting Farmers, Suppliers, and Distributors for a Prosperous Future</p>

        <SearchBar />


      </div>
    </section>
  );
};

export default HeroSection;
