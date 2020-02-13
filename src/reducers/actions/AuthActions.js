import { LOGIN_USER, SET_AUTH } from "../constants/AuthConstants";

/********
 SET AUTH 
 ********/
export const setAuth = (value, dispatch) => {
  dispatch({ type: SET_AUTH, payload: value });
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

    const user = await fetch("http://localhost:3000/auth/login", {
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
    const newUser = await fetch("http://localhost:3000/auth/register", {
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
    });

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
      `http://localhost:3000/auth/check-username?userName=${username}`
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
      `http://localhost:3000/auth/verify?id=${id}&token=${token}`
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
