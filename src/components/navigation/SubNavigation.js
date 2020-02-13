import React from "react";

const SubNavigation = ({ title, history }) => {
  let headerTitle;

  if (title.length > 16) {
    headerTitle = `${title.slice(0, 16)}...`;
  } else headerTitle = title;

  const goBack = () => {
    history.goBack();
  };

  return (
    <nav className="sub-navigation">
      <i onClick={goBack} className="fas fa-arrow-left"></i>
      <h2>{headerTitle}</h2>
    </nav>
  );
};

export default SubNavigation;
