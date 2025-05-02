import React, { useState } from "react";
import "./index.css";

// SVG Icons (custom replacements for Ant Design icons)
const ShoppingIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const AppstoreIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
  </svg>
);

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

// Custom Menu Item component that shows text under the icon
const IconMenuItem = ({ icon, text, isClicked, onClick, onMouseEnter, onMouseLeave, isHovered }) => (
  <div 
    className={`menu-item ${isHovered ? "menu-item-hovered" : ""}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className={`icon-menu-item ${isClicked ? "icon-menu-item-clicked" : ""}`}>
      <div className={`icon-container ${isClicked ? "icon-container-clicked" : ""}`}>
        <span className="icon">{icon}</span>
      </div>
      <div className={`item-text ${isClicked ? "item-text-clicked" : ""}`}>
        {text}
      </div>
    </div>
  </div>
);

// Custom Settings Item component
const SettingsMenuItem = ({ isClicked, onClick, onMouseEnter, onMouseLeave, isHovered }) => (
  <div 
    className={`menu-item ${isHovered ? "menu-item-hovered" : ""}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className={`settings-menu-item ${isClicked ? "settings-menu-item-clicked" : ""}`}>
      <div className={`settings-icon-container ${isClicked ? "settings-icon-container-clicked" : ""}`}>
        <span className={`settings-icon ${isClicked ? "settings-icon-clicked" : ""}`}>
          <SettingsIcon />
        </span>
      </div>
      <div className={`item-text ${isClicked ? "item-text-clicked" : ""}`}>
      </div>
    </div>
  </div>
);

const FoodOrderMenu = () => {
  // Track hover state and clicked state
  const [hoveredKey, setHoveredKey] = useState(null);
  const [clickedKey, setClickedKey] = useState(null);
  
  // Function to handle clicks
  const handleMenuClick = (key) => {
    setClickedKey(key === clickedKey ? null : key); // Toggle clicked state
  };
  
  return (
    <div style={{ width: "100%", display: "flex" }}>
      {/* Custom narrow menu with text under icons */}
      <div className="menu-container">
        {/* Top menu items */}
        <div className="menu-top">
          <IconMenuItem
            icon={<ShoppingIcon />}
            text="Big Orders"
            isClicked={clickedKey === "1"}
            isHovered={hoveredKey === "1"}
            onClick={() => handleMenuClick("1")}
            onMouseEnter={() => setHoveredKey("1")}
            onMouseLeave={() => setHoveredKey(null)}
          />
          <IconMenuItem
            icon={<AppstoreIcon />}
            text="Party Trays"
            isClicked={clickedKey === "2"}
            isHovered={hoveredKey === "2"}
            onClick={() => handleMenuClick("2")}
            onMouseEnter={() => setHoveredKey("2")}
            onMouseLeave={() => setHoveredKey(null)}
          />
          <IconMenuItem
            icon={<CoffeeIcon />}
            text="Solo Orders"
            isClicked={clickedKey === "3"}
            isHovered={hoveredKey === "3"}
            onClick={() => handleMenuClick("3")}
            onMouseEnter={() => setHoveredKey("3")}
            onMouseLeave={() => setHoveredKey(null)}
          />
        </div>
        
        {/* Bottom menu item - Settings */}
        <div className="menu-bottom">
          <SettingsMenuItem
            isClicked={clickedKey === "4"}
            isHovered={hoveredKey === "4"}
            onClick={() => handleMenuClick("4")}
            onMouseEnter={() => setHoveredKey("4")}
            onMouseLeave={() => setHoveredKey(null)}
          />
        </div>
      </div>
      
      {/* Main content area */}
      <div className="main-content">
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default FoodOrderMenu;