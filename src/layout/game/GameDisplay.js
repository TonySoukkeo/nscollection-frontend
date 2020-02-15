import React, { useContext, useEffect } from "react";
import { StateContext, DispatchContext } from "../../context/StateProvider";

// Actions
import { getGame } from "../../reducers/actions/GameActions";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import GameHeader from "../../components/game-display/GameHeader";
import GameActions from "../../components/game-display/GameActions";
import GameGallery from "../../components/game-display/GameGallery";
import GameInfo from "../../components/game-display/GameInfo";
import Loading from "../../components/loading/Loading";

// Custom Hooks
import useIsLoading from "../../hooks/useIsLoading";

const GameDisplay = () => {
  const { game } = useContext(StateContext);
  const { gameDispatch } = useContext(DispatchContext);

  const { loading, setLoading } = useIsLoading();

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("gameId");

    getGame(gameId, gameDispatch);
    setLoading(false);

    // Cleanup
    return () => {
      getGame(null, gameDispatch);
    };
  }, []);

  return (
    <React.Fragment>
      {game && game.title ? (
        <React.Fragment>
          <SubNavigation title={game.title} />
          <section className={!loading ? "game-display" : ""}>
            <GameHeader
              image={game.image}
              title={game.title}
              price={game.price}
              releaseDate={game.releaseDate}
              players={game.numOfPlayers}
              category={game.category}
              publisher={game.publisher}
              demo={game.demo || false}
              onlinePlay={game.onlinePlay || false}
              cloudSave={game.cloudSave || false}
            />

            <GameActions />

            <GameGallery
              id={game.id}
              gallery={game.gallery}
              title={game.title}
            />

            <GameInfo dlc={game.dlc} description={game.description} />
          </section>
        </React.Fragment>
      ) : (
        <Loading
          styles={{
            width: "10%",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)"
          }}
        />
      )}
    </React.Fragment>
  );
};

export default GameDisplay;
