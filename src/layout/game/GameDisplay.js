import React, { useContext, useEffect } from "react";
import { store } from "../../context/StateProvider";

// Actions
import { getGame } from "../../reducers/actions/GameActions";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import GameHeader from "../../components/game-display/GameHeader";
import GameActions from "../../components/game-display/GameActions";
import GameGallery from "../../components/game-display/GameGallery";
import GameInfo from "../../components/game-display/GameInfo";

const GameDisplay = () => {
  const { game, gameDispatch } = useContext(store);

  useEffect(() => {
    console.log("Fetching game");
    getGame("5e302842531c626d1fcb5176", gameDispatch);
  }, [game]);

  console.log(game);
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
