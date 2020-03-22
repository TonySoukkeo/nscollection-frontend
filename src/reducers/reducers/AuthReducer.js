import {
  SET_USER,
  SET_AUTH,
  SET_NOTIFICATION_COUNT
} from "../constants/AuthConstants";

const authInitialState = {
  isAuth: false,
  token: "",
  user: {},
  notificationCount: 0
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case SET_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: action.payload
      };

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
