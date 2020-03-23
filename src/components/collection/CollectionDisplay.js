import React from "react";

// Components
import GameList from "./GameList";
import Loading from "../loading/Loading";

const CollectionDisplay = React.forwardRef(
  (
    { games, loading, loadingType, totalGames, errorMessage, removeGame },
    ref
  ) => {
    const countTitle =
      games.length > 0 ? `${totalGames} in collection` : "0 in collection";

    return (
      <section className="collection container">
        {/*** Error display ***/}
        {errorMessage ? (
          <div className="alert alert--error mb-sm ">Error</div>
        ) : null}

        {loading && loadingType === "main" ? (
          <Loading
            styles={{
              width: "3rem",
              position: "absolute",
              left: "50%",
              top: "10rem",
              transform: "translateX(-50%)"
            }}
          />
        ) : (
          <React.Fragment>
            <span className="collection__count">{countTitle}</span>
            <ul className="collection__list">
              {games.map((game, index) => {
                if (games.length === index + 1) {
                  return (
                    <GameList
                      key={game.id}
                      removeGame={removeGame}
                      ref={ref}
                      id={game.id}
                      title={game.title}
                      image={game.image}
                      loading={loading}
                      loadingType={loadingType}
                    />
                  );
                } else {
                  return (
                    <GameList
                      key={game.id}
                      removeGame={removeGame}
                      id={game.id}
                      title={game.title}
                      image={game.image}
                      loading={loading}
                      loadingType={loadingType}
                    />
                  );
                }
              })}

              {loading && loadingType === "load more" ? (
                <Loading
                  styles={{
                    width: "3rem",
                    gridColumn: "1 / -1",
                    margin: "0 auto"
                  }}
                />
              ) : null}
            </ul>
          </React.Fragment>
        )}
      </section>
    );
  }
);

export default CollectionDisplay;
