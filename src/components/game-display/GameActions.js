import React from "react";

const GameActions = () => {
  return (
    <div className="game-display__action">
      <div className="game-display__addto">
        <span className="text-bold">Add to:</span>

        <button className="game-display__btn">Collection</button>

        <button className="game-display__btn">Wishlist</button>
      </div>

      <div className="horizontal-line"></div>

      <p>Let me know when this game goes on sale</p>
      <div className="center">
        <button className="game-display__btn center">Watch</button>
      </div>
    </div>
  );
};

export default GameActions;
