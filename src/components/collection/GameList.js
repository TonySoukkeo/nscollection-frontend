import React from "react";
import { Link } from "react-router-dom";

const GameList = ({ title, image }) => {
  let gameTitle;

  if (title.length > 40) {
    gameTitle = `${title.slice(0, 40)}...`;
  } else gameTitle = title;

  return (
    <li key={title} className="collection__list-item">
      {/*** Game Image ***/}
      <Link to="/">
        <img className="collection__list-image" src={image} />
      </Link>
      {/**** Game Title ****/}
      <Link to="/">
        <h2 className="collection__list-title">{gameTitle}</h2>
      </Link>

      {/**** Remove Button ****/}
      <button className="collection__list-btn">Remove</button>
    </li>
  );
};

export default GameList;
