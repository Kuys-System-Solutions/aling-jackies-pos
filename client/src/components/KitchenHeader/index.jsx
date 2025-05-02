import React, { useState, useEffect } from 'react';
import './KitchenHeader.css';
import logo from '../../assets/logo.png';

const KitchenHeader = () => {
  // Stats for open and done orders
  const [openOrders, setOpenOrders] = useState(7);
  const [doneOrders, setDoneOrders] = useState(2);
  
  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Format date as Month DD, YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <header className="kitchen-header">
      <div className="logo">
        <img src={logo} alt="Aling Jackie's Logo" />
      </div>
      
      <div className="order-counts">
        <button className="open-count">{openOrders} Open</button>
        <button className="done-count">{doneOrders} Done</button>
      </div>
      
      <div className="time-display">
        {formatTime(currentTime)} | {formatDate(currentTime)}
      </div>
    </header>
  );
};

export default KitchenHeader;