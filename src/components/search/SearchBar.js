import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <input
      onChange={onChange}
      type="text"
      className="search__bar"
      placeholder="Search"
    />
  );
};

export default SearchBar;
