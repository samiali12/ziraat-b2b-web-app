// Alert.js

import React, { useEffect } from 'react';

const Alert = ({ type, message, onClose }) => {
  const alertClass = {
    success: 'bg-[#28844b]',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];


  return (
    <div className={`relative w-full p-2 rounded ${alertClass} text-white transition-transform duration-300 transform ease-in-out z-10`}>
      <p className="text-center">{message}</p>
      <button className="absolute top-1 right-2  ml-2" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Alert;
