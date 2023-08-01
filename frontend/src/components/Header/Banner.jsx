import React from 'react';
import BannerImage from '../../assets/img/banner.jpg'

const BannerSection = () => {
  return (
    <div className="mx-auto max-w-7x1 px-6">
      {/* Image */}
      <img
        src={BannerImage}
        alt="Banner"
        className="w-full h-auto rounded-md shadow-sm"
      />
    </div>
  );
};

export default BannerSection;
