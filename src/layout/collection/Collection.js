import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from "react";
import { Link } from "react-router-dom";

// Components
import CollectionSubNavigation from "../../components/navigation/CollectionSubNavigation";
import CollectionDisplay from "../../components/collection/CollectionDisplay";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import usePath from "../../hooks/usePath";
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

const Collection = () => {
  const [collectionPath, setCollectionPath] = useState("collection");

  const [page, setPage] = useState(1);

  const [gameList, setGameList] = useState({
    game: [],
    loadMore: false
  });

  const [totalGames, setTotalGames] = useState(0);

  const { token, isAuth } = useContext(StateContext);

  const { game, loadMore } = gameList;

  const { loading, setLoading, loadingType, setLoadingType } = useIsLoading();
  const { errorMessage, setError } = useError();

  useEffect(() => {
    const getUserLibrary = async () => {
      try {
        setLoading(true);

        // Get userId
        const userId = localStorage.getItem("userId");

        let library, data;
        console.log("make collection api call");

        if (page !== 1) {
          setLoadingType("load more");
        } else {
          setLoadingType("main");
        }

        switch (collectionPath) {
          case "collection":
            library = await fetch(
              `${process.env.REACT_APP_BASE_URL}/user/get-collection?userId=${userId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  page
                })
              }
            );

            data = await library.json();
            break;

          case "wishlist":
            library = await fetch(
              `${process.env.REACT_APP_BASE_URL}/user/get-wishlist?userId=${userId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  page
                })
              }
            );

            data = await library.json();
            break;

          case "salewatch":
            library = await fetch(
              `${process.env.REACT_APP_BASE_URL}/user/get-salewatch?userId=${userId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  page
                })
              }
            );

            data = await library.json();
            break;

          default:
            break;
        }

        // Check for any errors
        if (data.status !== 200) {
          const error = new Error();
          error.message = data.message;

          throw error;
        }

        // Set gameList
        setGameList({
          game: [
            ...game,
            ...(collectionPath === "collection"
              ? data.gameCollection
              : collectionPath === "wishlist"
              ? data.wishlist
              : data.saleWatch)
          ],
          loadMore: data.loadMore
        });

        // Set total amount of games
        setTotalGames(data.totalAmount);

        setLoading(false);
        setLoadingType("");
      } catch (err) {
        setLoading(false);
        setLoadingType("");

        setError({
          errorMessage
        });
      }
    };

    getUserLibrary();
  }, [collectionPath, page]);

  // Observer and ref for infinite loading
  const observer = useRef();
  const lastGameElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && loadMore) {
          // Add to page number
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  // Change collection path
  const changeCollectionPath = value => {
    setGameList({
      game: [],
      loadMore: false
    });

    setCollectionPath(value);
    setPage(1);
  };

  // Set path name for bottom navigation active items
  usePath();

  // Remove game from library
  const removeGame = async gameId => {
    try {
      setLoading(true);
      setLoadingType(`${gameId}`);

      const type = collectionPath;

      // Api call to remove game from user DB
      const removedGame = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${type}?gameId=${gameId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await removedGame.json();

      // Check for any errors
      if (data.status !== 200) {
        const error = new Error();
        error.message = data.message;

        throw error;
      }

      // Filter out passed in gameId to gameList
      const filteredList = game.filter(game => game.id !== gameId);

      // Set gameList to new filteredList
      setGameList(prev => ({
        game: filteredList,
        loadMore: prev.loadMore
      }));

      setTotalGames(prevTotal => prevTotal - 1);
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
      <CollectionSubNavigation
        changeCollectionPath={changeCollectionPath}
        path={collectionPath}
      />

      {isAuth ? (
        <CollectionDisplay
          errorMessage={errorMessage}
          ref={lastGameElementRef}
          loading={loading}
          loadingType={loadingType}
          games={game}
          totalGames={totalGames}
          removeGame={removeGame}
        />
      ) : (
        <div style={{ textAlign: "center" }} className="collection">
          <span style={{ fontSize: "6rem", color: "#f15e55" }}>
            <i className="fas fa-frown-open"></i>
          </span>
          <h3>
            You must{" "}
            <Link className="collection__action-link" to="/register">
              register
            </Link>{" "}
            or{" "}
            <Link className="collection__action-link" to="/login">
              log in
            </Link>{" "}
            to view your game library
          </h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default Collection;
