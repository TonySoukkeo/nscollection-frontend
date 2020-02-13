import { LOGIN_USER, SET_AUTH } from "../constants/AuthConstants";

const authInitialState = {
  isAuth: false,
  userId: ""
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };
    default:
      return;
  }
};

export { authInitialState, authReducer };
