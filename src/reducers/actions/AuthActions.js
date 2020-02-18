import { SET_USER, SET_AUTH } from "../constants/AuthConstants";

/********
 SET USER
 ********/
export const setUser = (user, dispatch) => {
  dispatch({ type: SET_USER, payload: user });
};

/********
 SET AUTH 
 ********/
export const setAuth = (data, dispatch) => {
  dispatch({
    type: SET_AUTH,
    payload: { isAuth: data.isAuth, token: data.token }
  });
};

/*********** 
 USER LOGIN 
 ***********/
export const userLogin = async (loginHandle, password) => {
  try {
    // Check for any empty values
    if (!loginHandle) {
      const error = new Error();
      error.message = "Email or username cannot be blank";
      error.field = "loginHandle";
      error.status = 422;
      throw error;
    }

    if (!password) {
      const error = new Error();
      error.message = "Password field cannot be blank";
      error.field = "password";
      error.status = 422;
      throw error;
    }

    const user = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userLogin: loginHandle,
        password
      })
    });

    const data = await user.json();

    if (data.status !== 200) {
      const error = new Error();
      error.status = data.status;
      error.message = data.message;
      throw error;
    }

    return { token: data.token, userId: data.userId, status: data.status };
  } catch (err) {
    return err;
  }
};

/************* 
 REGISTER USER 
 *************/
export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  userName,
  allowEmail
}) => {
  try {
    const newUser = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          userName,
          allowEmail
        })
      }
    );

    const data = await newUser.json();

    if (data.status !== 200) {
      const error = new Error();
      error.statusCode = data.status;
      error.message = data.message;

      throw error;
    }

    return {
      status: data.status,
      message: data.message
    };
  } catch (err) {
    throw err;
  }
};

/***************** 
 VALIDATE USERNAME
 *****************/
export const validateUsername = async username => {
  try {
    // Check if username is below 3 or over 15 characters long
    if (username.length < 3 || username.length > 15) {
      const error = new Error();
      error.field = "userName";
      error.message = "Username must be between 3 to 15 characters long";

      throw error;
    }

    // Check if username already exists in db
    const usernameExists = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/check-username?userName=${username}`
    );

    const data = await usernameExists.json();

    if (data.status !== 200) {
      const error = new Error();
      error.message = data.message;
      error.field = "userName";
      error.status = data.status;

      throw error;
    }

    return {
      message: data.message,
      field: "userName",
      status: data.status
    };
  } catch (err) {
    return err;
  }
};

/*************
 CONFIRM EMAIL
 *************/
export const confirmEmail = async (token, id) => {
  try {
    // Do stuff
    const verified = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/verify?id=${id}&token=${token}`
    );

    const data = await verified.json();

    if (data.status !== 200) {
      const error = new Error();
      error.status = data.status;
      error.message = data.message;

      throw error;
    }

    return { message: data.message, status: data.status };
  } catch (err) {
    return err;
  }
};

/*********************** 
 ADD GAME TO USE PROFILE
 ***********************/
export const modifyGameToProfile = async ({ type, token, gameId, method }) => {
  try {
    let addedGame, data;

    switch (type) {
      case "collection":
        addedGame = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/collection?gameId=${gameId}`,
          {
            method: method === "add" ? "POST" : "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        data = await addedGame.json();
        break;

      case "wishlist":
        addedGame = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/wishlist?gameId=${gameId}`,
          {
            method: method === "add" ? "POST" : "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        data = await addedGame.json();
        break;

      case "salewatch":
        addedGame = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/salewatch?gameId=${gameId}`,
          {
            method: method === "add" ? "POST" : "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        data = await addedGame.json();
        break;

      default:
        break;
    }

    if (data.status !== 200) {
      const error = new Error();
      error.message = data.message;
      error.status = data.status;

      throw error;
    }

    return { status: data.status };
  } catch (err) {
    return err;
  }
};
