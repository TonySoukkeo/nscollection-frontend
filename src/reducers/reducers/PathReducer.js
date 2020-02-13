import { SET_PATH } from "../constants/PathConstants";

const pathInitialState = {
  path: "/"
};

const pathReducer = (state = pathInitialState, action) => {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        path: action.payload
      };

    default:
      return;
  }
};

export { pathInitialState, pathReducer };
