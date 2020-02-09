import React from "react";

const SubNavigation = ({ title }) => {
  return (
    <nav className="sub-navigation">
      <i className="fas fa-arrow-left"></i>
      <h2>{title}</h2>
    </nav>
  );
};

export default SubNavigation;
