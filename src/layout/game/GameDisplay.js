import React from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import GameHeader from "../../components/game-display/GameHeader";
import GameActions from "../../components/game-display/GameActions";
import GameGallery from "../../components/game-display/GameGallery";
import GameInfo from "../../components/game-display/GameInfo";

const GameDisplay = () => {
  return (
    <React.Fragment>
      <SubNavigation title="Super Mario Odyssey" />
      <section className="game-display">
        <GameHeader />

        <GameActions />

        <GameGallery />

        <GameInfo />
      </section>
    </React.Fragment>
  );
};

export default GameDisplay;
