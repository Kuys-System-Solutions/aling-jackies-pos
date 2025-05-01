import React, { useState } from "react";
import {
  ShoppingOutlined,
  AppstoreOutlined,
  CoffeeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// Custom Menu Item component that shows text under the icon
const IconMenuItem = ({ icon, text, isClicked }) => (
  <div
    className="flex flex-col items-center justify-center py-2 w-full"
    style={{
      backgroundColor: isClicked ? "rgba(0, 0, 0, 0.15)" : "transparent", 
      borderRadius: "8px",
      transition: "background-color 0.2s ease",
    }}
  >
    {/* Icon container with soft-edged square background */}
    <div
      className="relative flex items-center justify-center"
      style={{
        backgroundColor: isClicked
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(255, 255, 255, 0.3)",
        borderRadius: "16px",
        width: "50px",
        height: "50px",
        boxShadow: isClicked
          ? "inset 0 2px 6px rgba(0,0,0,0.3)"
          : "0 2px 6px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease",
        transform: isClicked ? "scale(0.95)" : "scale(1)",
      }}
    >
      {/* Icon with consistent styling */}
      <span
        className="flex items-center justify-center absolute"
        style={{
          fontSize: "42px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {icon}
      </span>
    </div>

    {/* Text under icon */}
    <div
      className="text-center font-bold"
      style={{
        fontSize: "10px",
        marginTop: "4px",
        lineHeight: "1.2",
        textShadow: isClicked ? "0 1px 1px rgba(0,0,0,0.2)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      {text}
    </div>
  </div>
);

const CategoryBar = () => {
  // Theme color: E7A5C7 (soft pink/purple)
  const themeColor = "#E7A5C7";

  // Track hover state and clicked state
  const [hoveredKey, setHoveredKey] = useState(null);
  const [clickedKey, setClickedKey] = useState(null);

  // Function to handle clicks
  const handleMenuClick = (key) => {
    setClickedKey(key === clickedKey ? null : key); // Toggle clicked state
  };

  // Menu items data
  const topMenuItems = [
    { key: "1", icon: <ShoppingOutlined />, text: "Big Orders" },
    { key: "2", icon: <AppstoreOutlined />, text: "Party Trays" },
    { key: "3", icon: <CoffeeOutlined />, text: "Solo Orders" },
  ];

  return (
    <div 
      className="fixed left-0 top-0 flex flex-col justify-between"
      style={{
        width: "100px",
        height: "100vh",
        backgroundColor: themeColor,
        boxShadow: "1px 0 5px rgba(0,0,0,0.2)",
      }}
    >
      {/* Top menu items */}
      <div 
        className="w-full overflow-y-auto pt-5 border-none"
        style={{ backgroundColor: themeColor }}
      >
        {topMenuItems.map(item => (
          <div
            key={item.key}
            className="h-auto my-4 p-0 w-full"
            style={{
              backgroundColor:
                hoveredKey === item.key ? "rgba(255, 255, 255, 0.2)" : "transparent",
            }}
            onMouseEnter={() => setHoveredKey(item.key)}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleMenuClick(item.key)}
          >
            <IconMenuItem
              icon={item.icon}
              text={item.text}
              isClicked={clickedKey === item.key}
            />
          </div>
        ))}
      </div>

      {/* Bottom menu item - Settings */}
      <div 
        className="w-full mb-5 border-none"
        style={{ backgroundColor: themeColor }}
      >
        <div
          className="h-auto my-4 p-0 w-full"
          style={{
            backgroundColor:
              hoveredKey === "4" ? "rgba(255, 255, 255, 0.2)" : "transparent",
          }}
          onMouseEnter={() => setHoveredKey("4")}
          onMouseLeave={() => setHoveredKey(null)}
          onClick={() => handleMenuClick("4")}
        >
          <IconMenuItem
            icon={<SettingOutlined />}
            text="Settings"
            isClicked={clickedKey === "4"}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;