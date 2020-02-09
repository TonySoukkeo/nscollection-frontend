import React from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";

const GameDisplay = () => {
  return (
    <React.Fragment>
      <SubNavigation title="Super Mario Odyssey" />
      <section className="game-display">Game Display</section>
    </React.Fragment>
  );
};

export default GameDisplay;
