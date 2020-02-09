import React from "react";

const SubNavigation = ({ title }) => {
  let headerTitle;

  if (title.length > 16) {
    headerTitle = `${title.slice(0, 16)}...`;
  } else headerTitle = title;

  return (
    <nav className="sub-navigation">
      <i className="fas fa-arrow-left"></i>
      <h2>{headerTitle}</h2>
    </nav>
  );
};

export default SubNavigation;
