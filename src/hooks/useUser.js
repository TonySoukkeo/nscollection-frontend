import { useState } from "react";

const useUser = () => {
  const [owned, setOwned] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [watched, setWatched] = useState(false);

  const checkUserLibrary = (arr, userId) => {
    let hasGame = false;

    if (userId) {
      arr.forEach(item => {
        if (item.user === userId) hasGame = true;
      });
    }

    return hasGame;
  };

  return {
    owned,
    setOwned,
    checkUserLibrary,
    wanted,
    setWanted,
    watched,
    setWatched
  };
};

export default useUser;
