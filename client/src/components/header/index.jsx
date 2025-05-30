import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.css"; 

const Logo = "./src/assets/logo.png";

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container">
        <img
          src={Logo}
        />
      </div>

      {/* Search Bar Container */}
      <div className="search-container">
        <Input
          placeholder="Search..."
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
        {/* Search Icon */}
        <SearchOutlined className="search-icon" />
      </div>

      {/* Optional: Navigation Items or User Menu */}
      <div className="nav-menu">
        {/* Navigation items go here */}
      </div>
    </header>
  );
};

export default Header;