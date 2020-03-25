import React, { useState } from "react";

const DlcDisplay = ({ dlc }) => {
  const [check, setCheck] = useState({});

  const toggleCheckBox = field => {
    setCheck({
      ...check,
      [field]: !check[field]
    });
  };

  return (
    <React.Fragment>
      {dlc.length > 0 ? (
        <React.Fragment>
          <h2 className="mt-md mb-sm">DLC</h2>
          <div className="game-display__info-dlc">
            {dlc.map(item => (
              <ul key={item.header} className="game-display__info-list">
                <h2>{item.header}</h2>
                <div className="game-display__info-list--grid">
                  {item.content.map(content => {
                    return (
                      <li
                        key={content.title}
                        className="game-display__info-item"
                      >
                        {/*** Dlc Image ***/}
                        <img src={content.image} alt={content.title} />

                        <div className="game-display__info-item--details-box">
                          {/*** Dlc title ***/}
                          <h3>{content.title}</h3>

                          {/*** Dlc release date ***/}
                          <p className="game-display__info-item--release-date">
                            {content.releaseDate}
                          </p>

                          {/*** Dlc Price ***/}
                          <p className="game-display__info-item--price">
                            {content.price === 0 ? "Free" : `$${content.price}`}
                          </p>
                        </div>

                        {/*** Button to toggle dlc info ***/}

                        <input
                          id="more-info"
                          type="checkbox"
                          checked={
                            check.hasOwnProperty(content.title) &&
                            check[content.title]
                          }
                        />
                        <label
                          onClick={() => toggleCheckBox(content.title)}
                          htmlFor="more-info"
                        >
                          Details
                        </label>

                        {/*** Dlc info ***/}
                        <p className="game-display__info-item--description">
                          {content.description}
                        </p>
                      </li>
                    );
                  })}
                </div>
              </ul>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default DlcDisplay;
