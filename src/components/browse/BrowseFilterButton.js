import React from "react";

const BrowseFilterButton = ({ toggleFilter, hideButton, totalGames }) => {
  return (
    <div
      className={hideButton ? "browse__filter opacity-none" : "browse__filter"}
    >
      <span onClick={toggleFilter} style={{ cursor: "pointer" }}>
        {" "}
        <i className="fas fa-filter"></i> Filter
      </span>
      <span className="browse__filter-total">{totalGames} found</span>
    </div>
  );
};

export default BrowseFilterButton;
