import React, { useContext, useEffect, useState } from "react";
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
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("gameId");

    getGame(gameId, gameDispatch);
  }, []);

  return (
    <React.Fragment>
      <SubNavigation title="Super Mario Odyssey" />
      <section className="game-display">
        {game.data ? (
          <React.Fragment>
            <GameHeader />

            <GameActions />

            <GameGallery />

            <GameInfo />
          </React.Fragment>
        ) : null}
      </section>
    </React.Fragment>
  );
};

export default GameDisplay;
