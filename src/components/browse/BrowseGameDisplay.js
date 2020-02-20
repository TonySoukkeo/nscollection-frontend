import React from "react";
import { Link } from "react-router-dom";

const BrowseGameDisplay = ({ game }) => {
  return (
    <Link to={`/game?gameId=${game.id}`} className="browse__item">
      <img
        className="browse__item-game-img"
        src={game.image}
        alt={game.title}
      />
      <div className="browse__item--meta">
        <h4>{game.title}</h4>

        <div className="browse__item-raing--container">
          <img
            className="browse__item-rating"
            src={game.rating}
            alt="Game Rating"
          />
        </div>

        <div className="browse__item--meta-container">
          {/*** Display price / saleprice ***/}
          <div className="browse__item--meta-price">
            <span className={game.salePrice ? "strike" : "msrp"}>
              ${game.price}
            </span>

            {game.salePrice ? (
              <span className="ml-sm sale-price">${game.salePrice}</span>
            ) : null}
          </div>
          {/*** Display online capabilities ***/}
          {game.onlinePlay || game.cloudSave ? (
            <div className="browse__item--meta-online">
              {game.onlinePlay ? (
                <span>
                  <img
                    className="browse__item--meta-online-play"
                    src="https://www.nintendo.com/etc.clientlibs/noa/clientlibs/clientlib-ncom/resources/images/global/logos/logo-nso.svg"
                    alt="online play"
                  />
                </span>
              ) : null}

              {game.cloudSave ? (
                <span className="browse__item--meta-cloud">
                  <i className="fas fa-cloud-upload-alt"></i>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default BrowseGameDisplay;
