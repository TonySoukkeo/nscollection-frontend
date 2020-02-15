import React from "react";

const GameHeader = ({
  image,
  title,
  price,
  releaseDate,
  players,
  category,
  publisher,
  demo,
  onlinePlay,
  cloudSave
}) => {
  return (
    <React.Fragment>
      <div className="game-display__group">
        {/*** Game image ***/}
        <img src={image} alt={title} />

        {/*** Game Meta ***/}
        <div className="game-display__group-meta">
          <h1>{title}</h1>

          <span className="game-display__group-price">${price}</span>

          <p>
            <span className="text-bold">Release Date</span> {releaseDate}
          </p>

          <p>
            <span className="text-bold">No. of Players</span> {players}
          </p>

          <p>
            <span className="text-bold">Category</span> {category}
          </p>

          <p>
            <span className="text-bold">Publisher</span> {publisher}
          </p>

          <p>
            <span className="text-bold">Demo Available</span>{" "}
            {demo ? "Yes" : "No"}
          </p>
        </div>
      </div>
      {onlinePlay || cloudSave ? (
        <div className="game-display__online">
          <span className="text-bold">Supports</span>
          <div className="game-display__online-icon">
            {onlinePlay ? (
              <img
                src="https://www.nintendo.com/etc.clientlibs/noa/clientlibs/clientlib-ncom/resources/images/global/logos/logo-nso.svg"
                alt="online play"
              />
            ) : null}

            {cloudSave ? <i className="fas fa-cloud-upload-alt"></i> : null}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default GameHeader;
