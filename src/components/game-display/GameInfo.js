import React from "react";

// Components
import DlcDisplay from "./DlcDisplay";

const GameInfo = ({ description, dlc }) => {
  return (
    <div className="game-display__info container">
      {description}

      <DlcDisplay dlc={dlc} />
    </div>
  );
};

export default GameInfo;
