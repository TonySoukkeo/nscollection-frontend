import React from "react";

const BottomNavigation = () => {
  return (
    <nav className="bottom-navigation">
      <a href="/">
        <i className="bottom-navigation--icon fas fa-home"></i>
      </a>
      <a href="/collection">
        <i className="bottom-navigation--icon fas fa-box"></i>
      </a>
      <a href="/search">
        <i className="bottom-navigation--icon fas fa-search"></i>
      </a>
      <a href="/profile">
        <i className="bottom-navigation--icon fas fa-user"></i>
      </a>
    </nav>
  );
};

export default BottomNavigation;
