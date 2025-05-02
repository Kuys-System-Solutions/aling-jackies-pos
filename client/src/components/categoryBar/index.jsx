import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Menu as AntMenu } from "antd";

// Icons matching the original design
const ShoppingOutlined = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z" />
  </svg>
);

const AppstoreOutlined = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z" />
  </svg>
);

const CoffeeOutlined = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M275 281c19.9 0 36-16.1 36-36V36c0-19.9-16.1-36-36-36s-36 16.1-36 36v209c0 19.9 16.1 36 36 36zm613 144H768v-96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96H548v-96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96H348v-96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96H136c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h752c35.3 0 64-28.7 64-64V489c0-35.3-28.7-64-64-64zm0 640H136V489h752v576zM496 281c19.9 0 36-16.1 36-36V36c0-19.9-16.1-36-36-36s-36 16.1-36 36v209c0 19.9 16.1 36 36 36zm-221 0c19.9 0 36-16.1 36-36V36c0-19.9-16.1-36-36-36s-36 16.1-36 36v209c0 19.9 16.1 36 36 36z" />
  </svg>
);

const SettingOutlined = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8-21.1 21.2-32.8 49.2-32.8 79.1 0 29.9 11.7 57.9 32.8 79.1 21.2 21.1 49.2 32.8 79.1 32.8 29.9 0 57.9-11.7 79.1-32.8 21.1-21.2 32.8-49.2 32.8-79.1 0-29.9-11.7-57.9-32.8-79.1a110.96 110.96 0 00-79.1-32.8zm412.3 235.5l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9a32.03 32.03 0 009.3-35.2l-.9-2.6a442.5 442.5 0 00-79.6-137.7l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52-9.4-106.8-9.4-158.8 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.3a353.44 353.44 0 00-99 57.1l-81.8-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a445.93 445.93 0 00-79.6 137.7l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57 0 19.2 1.5 38.4 4.6 57l-66 56.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3a32.05 32.05 0 0025.8 25.7l2.7.5a448.27 448.27 0 00158.8 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c4.3-12.4.6-26.3-9.5-35zm-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8 175.8 78.7 175.8 175.8-78.7 175.8-175.8 175.8z" />
  </svg>
);

// Custom Menu Item component that shows text under the icon
const IconMenuItem = ({ icon, text, isClicked }) => (
  <div className={`flex flex-col items-center justify-center py-2 w-full transition-colors duration-200 ${isClicked ? 'bg-opacity-15 bg-black' : 'bg-transparent'} rounded-lg`}>
    {/* Icon container with soft-edged square background */}
    <div 
      className={`flex items-center justify-center relative w-12 h-12 rounded-2xl transition-all duration-200 ${
        isClicked 
          ? 'bg-white bg-opacity-50 shadow-inner transform scale-95' 
          : 'bg-white bg-opacity-30 shadow-md'
      }`}
    >
      {/* Make the icon bigger but keep container the same size */}
      <span className="text-4xl flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {icon}
      </span>
    </div>
    <div className={`text-xs mt-1 text-center font-bold leading-tight transition-all duration-200 ${isClicked ? 'text-shadow' : ''}`}>
      {text}
    </div>
  </div>
);

// Custom Settings Item component without the soft-edged square background
const SettingsMenuItem = ({ isClicked }) => (
  <div className={`flex flex-col items-center justify-center py-2 w-full transition-all duration-300 ${isClicked ? 'bg-black bg-opacity-20' : 'bg-transparent'} rounded-lg`}>
    {/* Settings icon without container - bigger height when clicked */}
    <div 
      className={`flex items-center justify-center relative transition-all duration-300 w-16 ${
        isClicked ? 'h-12' : 'h-10'
      }`}
    >
      <span 
        className={`text-7xl flex items-center justify-center transition-all duration-300 ${
          isClicked 
            ? 'text-black text-opacity-80 filter drop-shadow transform scale-105' 
            : 'text-black text-opacity-50 filter drop-shadow-sm'
        }`}
      >
        <SettingOutlined />
      </span>
    </div>
    <div className="text-xs mt-1 text-center font-bold leading-tight"></div>
  </div>
);

const FoodOrderMenu = () => {
  // Theme color: E7A5C7 (soft pink/purple)
  const themeColor = "#E7A5C7";

  // Track hover state and clicked state
  const [hoveredKey, setHoveredKey] = useState(null);
  const [clickedKey, setClickedKey] = useState(null);

  // Function to handle clicks
  const handleMenuClick = (key) => {
    setClickedKey(key === clickedKey ? null : key); // Toggle clicked state
  };

  return (
    <div className="flex w-full">
      {/* Custom narrow menu with text under icons */}
      <div
        className="fixed left-0 top-0 w-24 h-screen flex flex-col justify-between shadow-md"
        style={{ backgroundColor: themeColor }}
      >
        {/* Top menu items */}
        <AntMenu
          mode="inline"
          className="w-24 overflow-y-auto pt-5 border-none"
          style={{ backgroundColor: themeColor }}
          selectedKeys={[]}
        >
          <AntMenu.Item
            key="1"
            className={`h-auto my-4 p-0 w-full transition-colors duration-300 ${
              hoveredKey === "1" ? "bg-white bg-opacity-20" : "bg-transparent"
            }`}
            onMouseEnter={() => setHoveredKey("1")}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleMenuClick("1")}
          >
            <IconMenuItem
              icon={<ShoppingOutlined />}
              text="Big Orders"
              isClicked={clickedKey === "1"}
            />
          </AntMenu.Item>
          <AntMenu.Item
            key="2"
            className={`h-auto my-4 p-0 w-full transition-colors duration-300 ${
              hoveredKey === "2" ? "bg-white bg-opacity-20" : "bg-transparent"
            }`}
            onMouseEnter={() => setHoveredKey("2")}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleMenuClick("2")}
          >
            <IconMenuItem
              icon={<AppstoreOutlined />}
              text="Party Trays"
              isClicked={clickedKey === "2"}
            />
          </AntMenu.Item>
          <AntMenu.Item
            key="3"
            className={`h-auto my-4 p-0 w-full transition-colors duration-300 ${
              hoveredKey === "3" ? "bg-white bg-opacity-20" : "bg-transparent"
            }`}
            onMouseEnter={() => setHoveredKey("3")}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleMenuClick("3")}
          >
            <IconMenuItem
              icon={<CoffeeOutlined />}
              text="Solo Orders"
              isClicked={clickedKey === "3"}
            />
          </AntMenu.Item>
        </AntMenu>

        {/* Bottom menu item - Settings */}
        <AntMenu
          mode="inline"
          className="w-24 mb-5 border-none"
          style={{ backgroundColor: themeColor }}
          selectedKeys={[]}
        >
          <AntMenu.Item
            key="4"
            className={`h-auto my-4 p-0 w-full transition-colors duration-300 ${
              hoveredKey === "4" ? "bg-white bg-opacity-20" : "bg-transparent"
            }`}
            onMouseEnter={() => setHoveredKey("4")}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleMenuClick("4")}
          >
            <SettingsMenuItem isClicked={clickedKey === "4"} />
          </AntMenu.Item>
        </AntMenu>
      </div>

      {/* Main content area */}
      <div className="ml-24 p-5 w-full" style={{ width: "calc(100% - 6rem)" }}>
        <h1 className="text-xl font-bold mb-4">Food Order App</h1>
        <p>Click on a menu item to see it in action!</p>
        {clickedKey && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-bold">
              {clickedKey === "1" && "Big Orders Section"}
              {clickedKey === "2" && "Party Trays Section"}
              {clickedKey === "3" && "Solo Orders Section"}
              {clickedKey === "4" && "Settings Section"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodOrderMenu;