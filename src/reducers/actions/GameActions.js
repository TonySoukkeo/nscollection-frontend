import { GET_GAME } from "../constants/GameConstants";

const getGame = async (gameId, dispatch) => {
  try {
    if (!gameId) {
      dispatch({ type: GET_GAME, payload: {} });
    } else {
      // Get call from api
      const game = await fetch(`http://localhost:3000/games/?gameId=${gameId}`);

      const data = await game.json();

      dispatch({ type: GET_GAME, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

export { getGame };
