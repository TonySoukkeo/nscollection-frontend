import React, { useContext, useEffect, useState } from "react";
import { StateContext, DispatchContext } from "../../context/StateProvider";

// Actions
import { getGame } from "../../reducers/actions/GameActions";
import { modifyGameToProfile } from "../../reducers/actions/AuthActions";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import GameHeader from "../../components/game-display/GameHeader";
import GameActions from "../../components/game-display/GameActions";
import GameGallery from "../../components/game-display/GameGallery";
import GameInfo from "../../components/game-display/GameInfo";
import Loading from "../../components/loading/Loading";

// Custom Hooks
import useIsLoading from "../../hooks/useIsLoading";
import useUser from "../../hooks/useUser";
import useError from "../../hooks/useError";

const GameDisplay = ({ location, history }) => {
  const [gameId, setGameId] = useState("");

  const { token, game } = useContext(StateContext);
  const { gameDispatch } = useContext(DispatchContext);

  const { errorMessage, setError } = useError();
  const { loading, setLoading, loadingType, setLoadingType } = useIsLoading();

  const {
    owned,
    setOwned,
    wanted,
    setWanted,
    watched,
    setWatched,
    checkUserLibrary
  } = useUser();

  useEffect(() => {
    try {
      console.log("second api call");

      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);

      const gameId = urlParams.get("gameId");

      const fetchGame = async () => {
        const game = await getGame(gameId, gameDispatch);
        setGameId(gameId);

        const userId = localStorage.getItem("userId");

        // Check for any errors
        if (game.status !== 200) {
          const error = new Error();
          error.message = game.message;

          throw error;
        }

        // Check if user has the game in any of their collection, watchlist, or salewatch

        const hasOwned = checkUserLibrary(game.game.ownedBy, userId);

        const hasWanted = checkUserLibrary(game.game.wantedBy, userId);

        const hasWatched = checkUserLibrary(game.game.watchedBy, userId);

        if (hasOwned) setOwned(true);

        if (hasWanted) setWanted(true);

        if (hasWatched) setWatched(true);

        setLoading(false);
      };

      fetchGame();
    } catch (err) {
      setError({
        errorMessage: err.message
      });
    }

    // Cleanup
    return () => {
      getGame(null, gameDispatch);
      setGameId("");
      setOwned(false);
      setWanted(false);
      setWatched(false);
    };
  }, [location]);

  // Onclick to add game to user profile, depending on the type
  const modifyGameTo = async (type, method) => {
    try {
      setLoading(true);

      // Reset error message
      setError({ errorMessage: "" });

      // Set loading type to indicate when to display spinner
      if (type === "collection") setLoadingType("collection");
      else if (type === "wishlist") {
        setLoadingType("wishlist");
      } else if (type === "salewatch") {
        setLoadingType("salewatch");
      }

      const options = {
        type,
        token,
        gameId,
        method
      };

      const action = await modifyGameToProfile(options);

      if (action.status !== 200) {
        const error = new Error();
        error.message = action.message;

        throw error;
      }

      if (type === "collection" && method === "remove") setOwned(false);

      if (type === "collection" && method === "add") {
        setOwned(true);
        setWanted(false);
      }

      if (type === "wishlist" && method === "remove") setWanted(false);

      if (type === "wishlist" && method === "add") setWanted(true);

      if (type === "salewatch" && method === "remove") setWatched(false);

      if (type === "salewatch" && method === "add") setWatched(true);

      setLoading(false);
      setLoadingType("");
    } catch (err) {
      setLoading(false);
      setLoadingType("");
      setError({
        errorMessage: err.message
      });
    }
  };

  return (
    <React.Fragment>
      {game && game.title ? (
        <React.Fragment>
          <SubNavigation title={game.title} history={history} />
          <section className={!loading ? "game-display" : ""}>
            <GameHeader
              image={game.image}
              title={game.title}
              price={game.price}
              salePrice={game.salePrice}
              releaseDate={game.releaseDate}
              players={game.numOfPlayers}
              category={game.category}
              publisher={game.publisher}
              demo={game.demo || false}
              onlinePlay={game.onlinePlay || false}
              cloudSave={game.cloudSave || false}
              rating={game.rating}
            />

            <GameActions
              errorMessage={errorMessage}
              wanted={wanted}
              owned={owned}
              watched={watched}
              modifyGameTo={modifyGameTo}
              loading={loading}
              loadingType={loadingType}
            />

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
            width: "3rem",
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
