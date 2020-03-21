import React from "react";

// Components
import Loading from "../../components/loading/Loading";

const GameActions = ({
  owned,
  wanted,
  watched,
  errorMessage,
  modifyGameTo,
  loading,
  loadingType
}) => {
  return (
    <div className="game-display__action container">
      <div className="game-display__addto">
        <span className="text-bold">Add to:</span>

        {loading && loadingType === "collection" ? (
          <Loading styles={{ width: "10%", marginRight: "1rem" }} />
        ) : (
          <button
            onClick={() => modifyGameTo("collection", owned ? "remove" : "add")}
            className={
              owned
                ? "game-display__btn game-display__btn--true"
                : "game-display__btn"
            }
          >
            Collection
          </button>
        )}

        {loading && loadingType === "wishlist" ? (
          <Loading styles={{ width: "10%", marginLeft: "1rem" }} />
        ) : (
          <button
            onClick={() => modifyGameTo("wishlist", wanted ? "remove" : "add")}
            className={
              wanted
                ? "game-display__btn game-display__btn--true"
                : "game-display__btn"
            }
          >
            Wishlist
          </button>
        )}
      </div>

      {errorMessage ? (
        <div className="alert alert--err">{errorMessage}</div>
      ) : null}

      <div className="horizontal-line"></div>

      <p>Let me know when this game goes on sale</p>
      <div className="center">
        {loading && loadingType === "salewatch" ? (
          <Loading styles={{ width: "10%" }} />
        ) : (
          <button
            onClick={() =>
              modifyGameTo("salewatch", watched ? "remove" : "add")
            }
            className={
              watched
                ? "game-display__btn game-display__btn--true center"
                : "game-display__btn center"
            }
          >
            Watch
          </button>
        )}
      </div>
    </div>
  );
};

export default GameActions;
