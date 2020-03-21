import React from "react";
import { Link } from "react-router-dom";

// Components
import Loading from "../../components/loading/Loading";

const GameList = React.forwardRef(
  ({ title, image, id, removeGame, loading, loadingType }, ref) => {
    let gameTitle;

    if (title.length > 40) {
      gameTitle = `${title.slice(0, 40)}...`;
    } else gameTitle = title;

    return (
      <li ref={ref} className="collection__list-item">
        {/*** Game Image ***/}
        <Link to={`/game?gameId=${id}`}>
          <img className="collection__list-image" src={image} />
        </Link>

        {/**** Game Title ****/}
        <Link to={`/game?gameId=${id}`}>
          <h2 className="collection__list-title">{gameTitle}</h2>
        </Link>

        {/**** Remove Button ****/}
        {loading && loadingType === id ? (
          <Loading
            styles={{
              width: "3rem",
              position: "absolute",
              right: "1rem",
              bottom: "1rem"
            }}
          />
        ) : (
          <button
            onClick={() => removeGame(id)}
            className="collection__list-btn"
          >
            Remove
          </button>
        )}
      </li>
    );
  }
);

export default GameList;
