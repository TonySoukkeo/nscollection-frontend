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

// Path state / reducer
import {
  pathInitialState,
  pathReducer
} from "../reducers/reducers/PathReducer";

const StateContext = createContext();
const DispatchContext = React.createContext();

const StateProvider = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const [pathState, pathDispatch] = useReducer(pathReducer, pathInitialState);

  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const stateValue = {
    ...gameState,
    ...authState,
    ...pathState
  };

  const dispatchValue = {
    gameDispatch,
    authDispatch,
    pathDispatch
  };

  return (
    <DispatchContext.Provider value={dispatchValue}>
      <StateContext.Provider value={stateValue}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { StateContext, DispatchContext, StateProvider };
