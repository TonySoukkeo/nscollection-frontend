import React from "react";

const GameHeader = () => {
  return (
    <div className="game-display__group">
      {/*** Game image ***/}
      <img
        src="https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/Switch_SuperMarioOdyssey_box.png"
        alt="Mario"
      />

      {/*** Game Meta ***/}
      <div className="game-display__group-meta">
        <h1>Super Mario Odysssey</h1>
        <span className="game-display__group-price">$59.99</span>

        <p>
          <span className="text-bold">Release Date</span> Sep 27, 2018
        </p>

        <p>
          <span className="text-bold">No. of Players</span> up to 2 players
        </p>

        <p>
          <span className="text-bold">Category</span> Action, Platformer
        </p>

        <p>
          <span className="text-bold">Publisher</span> Nintendo
        </p>

        <p>
          <span className="text-bold">Demo Available</span> No
        </p>
      </div>
      <div className="game-display__online">
        <span className="text-bold">Supports</span>
        <div className="game-display__online-icon">
          <img
            src="https://www.nintendo.com/etc.clientlibs/noa/clientlibs/clientlib-ncom/resources/images/global/logos/logo-nso.svg"
            alt="online play"
          />

          <i className="fas fa-cloud-upload-alt"></i>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
