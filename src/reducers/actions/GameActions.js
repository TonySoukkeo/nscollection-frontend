import axios from "axios";
import { GET_GAME } from "../constants/GameConstants";

const getGame = async (gameId, dispatch) => {
  try {
    // Get call from api
    const game = await axios.get(
      `http://localhost:3000/games/?gameId=${gameId}`
    );

    dispatch({ type: GET_GAME, payload: game });
  } catch (err) {
    console.log(err);
  }
};

export { getGame };
