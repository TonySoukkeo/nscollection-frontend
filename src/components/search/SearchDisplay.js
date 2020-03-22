import React from "react";
import { Link } from "react-router-dom";

const SearchDisplay = ({
  title,
  price,
  salePrice,
  image,
  players,
  releaseDate,
  ownedBy,
  userId,
  checkUserLibrary,
  id,
  clearResults = null
}) => {
  let priceDisplay;

  const owned = checkUserLibrary(ownedBy, userId);

  if (salePrice) {
    priceDisplay = (
      <React.Fragment>
        <span className="strike">${price}</span>
        <span className="sale-price">${salePrice}</span>
      </React.Fragment>
    );
  } else if (price) {
    priceDisplay = `$${price}`;
  } else if (price === 0) {
    priceDisplay = "Free";
  }

  return (
    <Link to={`/game?gameId=${id}`}>
      <li onClick={clearResults} className="search__item">
        <img src={image} className="search__item-image" />
        <div className="search__item-content">
          <div className="search__item-title">{title}</div>
          <div className="search__item-date">
            <span className="text-bold">Release Date</span> {releaseDate}
          </div>
          <div className="search__item-players">
            <span className="text-bold">No. of Players</span> {players}
          </div>
          <div className="search__item-price">{priceDisplay}</div>
        </div>
        {owned ? (
          <div className="search__item-owned">
            <span>Own</span>
          </div>
        ) : null}
      </li>
    </Link>
  );
};

export default SearchDisplay;
