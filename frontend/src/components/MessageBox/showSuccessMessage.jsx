import React, { useState } from 'react';

const SuccessMessage = ({ show, message }) => {
  return (
    <div
      className={`fixed bottom-0 right-0 mb-4 mr-4 p-4 rounded-lg bg-green-500 text-white ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } transform transition-transform duration-300 ease-in-out`}
    >
      {message}
    </div>
  );
};

export default SuccessMessage;
