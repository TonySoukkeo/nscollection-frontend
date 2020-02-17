import {
  SET_USER,
  SET_AUTH,
  ADD_TO_COLLECTION
} from "../constants/AuthConstants";

const authInitialState = {
  isAuth: false,
  token: "",
  user: {}
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        token: action.payload.token
      };

    default:
      return;
  }
};

export { authInitialState, authReducer };
