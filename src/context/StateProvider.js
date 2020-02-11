import React, { useReducer, createContext } from "react";

// Game details state / reducer
import {
  gameInitialState,
  gameReducer
} from "../reducers/reducers/GamesReducer";

// Auth state / reducer
import {
  authInitialState,
  authReducer
} from "../reducers/reducers/AuthReducer";

const store = createContext();
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);

  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const value = {
    ...gameState,
    ...gameDispatch,
    ...authState,
    ...authDispatch
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };
