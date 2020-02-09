import React from "react";
import { Link } from "react-router-dom";

const SearchDisplay = ({ title, price, image, players, releaseDate, own }) => {
  return (
    <Link to="/">
      <li className="search__item">
        <img src={image} className="search__item-image" />
        <div className="search__item-content">
          <div className="search__item-title">{title}</div>
          <div className="search__item-date">
            <span className="text-bold">Release Date</span> {releaseDate}
          </div>
          <div className="search__item-players">
            <span className="text-bold">No. of Players</span> {players}
          </div>
          <div className="search__item-price">${price}</div>
        </div>
        {own ? (
          <div className="search__item-owned">
            <span>Own</span>
          </div>
        ) : null}
      </li>
    </Link>
  );
};

export default SearchDisplay;
