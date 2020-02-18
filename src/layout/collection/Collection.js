import React, { useState, useEffect } from "react";

// Components
import CollectionSubNavigation from "../../components/navigation/CollectionSubNavigation";
import CollectionDisplay from "../../components/collection/CollectionDisplay";

// Custom hooks
import usePath from "../../hooks/usePath";
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

const Collection = () => {
  const [collectionPath, setCollectionPath] = useState("collection");

  const [gameList, setGameList] = useState({
    game: [],
    loadMore: false
  });

  const { loading, setLoading } = useIsLoading();
  const { errorMessage, setError } = useError();

  useEffect(() => {
    const getUserLibrary = async () => {
      try {
        setLoading(true);
        // Get userId
        const userId = localStorage.getItem("userId");

        let library, data;
        console.log("make collection api call");
        switch (collectionPath) {
          case "collection":
            library = await fetch(
              `${process.env.REACT_APP_BASE_URL}/user/get-collection?userId=${userId}`,
              {
                method: "POST"
              }
            );

            data = await library.json();
            break;

          case "wishlist":
            library = await fetch(
              `${process.env.REACT_APP_BASE_URL}/user/get-wishlist?userId=${userId}`,
              {
                method: "POST"
              }
            );

            data = await library.json();
            break;

          case "salewatch":
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
          game:
            collectionPath === "collection"
              ? data.gameCollection
              : collectionPath === "wishlist"
              ? data.wishlist
              : data.salewatch,
          loadMore: data.loadMore
        });

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError({
          errorMessage
        });
      }
    };

    getUserLibrary();

    // Cleanup
    return () => {
      setGameList({
        game: [],
        loadMore: false
      });
    };
  }, [collectionPath]);

  // Change collection path
  const changeCollectionPath = value => {
    setCollectionPath(value);
  };

  // Set path name for bottom navigation active items
  usePath();

  return (
    <React.Fragment>
      <CollectionSubNavigation
        changeCollectionPath={changeCollectionPath}
        path={collectionPath}
      />
      <CollectionDisplay loading={loading} games={gameList.game} />
    </React.Fragment>
  );
};

export default Collection;
