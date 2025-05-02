import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#D15F9A",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Logo */}
      <div>
        <img
          src="client/src/assets/logo.png"
          alt="Logo"
          style={{
            height: "50px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Search Bar Container - only a few pixels away from logo */}
      <div
        style={{
          display: "flex",
          flex: "0 1 500px",
          position: "relative",
          marginLeft: "40px", // Small gap between logo and search
        }}
      >
        <Input
          placeholder="Search..."
          style={{
            borderRadius: "20px",
            padding: "8px 16px",
            paddingRight: "40px", // Space for the icon
            width: "100%",
          }}
        />
        {/* Search Icon positioned on the right side of the input */}
        <SearchOutlined
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "18px",
            color: "#999",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Optional: Navigation Items or User Menu */}
      <div
        style={{
          color: "white",
          marginLeft: "auto", // Push to the right
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span style={{ fontWeight: "bold", cursor: "pointer" }}>Home</span>
        <span style={{ fontWeight: "bold", cursor: "pointer" }}>Products</span>
        <span style={{ fontWeight: "bold", cursor: "pointer" }}>Contact</span>
      </div>
    </header>
  );
};

export default Header;