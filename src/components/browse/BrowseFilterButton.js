import React from "react";

const BrowseFilterButton = ({ toggleFilter, hideButton }) => {
  return (
    <div
      className={hideButton ? "browse__filter opacity-none" : "browse__filter"}
    >
      <span onClick={toggleFilter} style={{ cursor: "pointer" }}>
        {" "}
        <i className="fas fa-filter"></i> Filter
      </span>
    </div>
  );
};

export default BrowseFilterButton;
