const { GET_GAME } = require("../constants/GameConstants");

const gameInitialState = {
  game: {}
};

const gameReducer = (state = gameInitialState, action) => {
  switch (action.type) {
    case GET_GAME:
      return {
        ...state,
        game: action.payload
      };

    default:
      return;
  }
};

export { gameInitialState, gameReducer };
