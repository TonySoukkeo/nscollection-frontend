import { LOGIN_USER } from "../constants/AuthConstants";

const authInitialState = {
  isAuth: false,
  userId: ""
};

const authReducer = (state = authInitialState, action) => {
  switch (action) {
    default:
      return;
  }
};

export { authInitialState, authReducer };
