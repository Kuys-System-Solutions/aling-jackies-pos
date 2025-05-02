import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';

const KitchenView = () => {
  return (
    <div className="kitchen-view-wrapper">
      <header className="kitchen-header">
        <div className="logo">
          <img src={logo} alt="Aling Jackie's Logo" />
        </div>
      </header>

      <div className="main-content flex flex-row items-center justify-center">
        <button type="button" className="text-4xl font-bold m-5 py-100 w-[40%] bg-yellow-200 hover:bg-yellow-300 hover:cursor-pointer rounded-xl drop-shadow-lg">
          Dine-In
        </button>
        <button type="button" className="text-4xl font-bold m-5 py-100 w-[40%] bg-pink-200 hover:bg-pink-300 hover:cursor-pointer rounded-xl drop-shadow-lg">Take-Out</button>
      </div>
    </div>
  );
};

export default KitchenView;
