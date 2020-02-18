import React from "react";

// Components
import GameList from "./GameList";
import Loading from "../loading/Loading";

const CollectionDisplay = ({ games, loading }) => {
  const countTitle =
    games.length > 0 ? `${games.length} in collection` : "0 in collection";

  return (
    <section className="collection">
      {!loading ? (
        <React.Fragment>
          <span className="collection__count">{countTitle}</span>
          <ul className="collection__list">
            {games.map(game => (
              <GameList title={game.title} image={game.image} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <Loading
          styles={{
            width: "10%",
            position: "absolute",
            left: "50%",
            top: "10rem",
            transform: "translateX(-50%)"
          }}
        />
      )}
    </section>
  );
};

export default CollectionDisplay;
