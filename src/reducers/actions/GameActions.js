import { GET_GAME } from "../constants/GameConstants";

const getGame = async (gameId, dispatch) => {
  try {
    if (!gameId) {
      dispatch({ type: GET_GAME, payload: {} });
    } else {
      // Get call from api
      const game = await fetch(
        `${process.env.REACT_APP_BASE_URL}/games/?gameId=${gameId}`
      );

      const data = await game.json();

      dispatch({ type: GET_GAME, payload: data });

      // Return game data back to client
      return { game: data, status: 200 };
    }
  } catch (err) {
    return err;
  }
};

export { getGame };
