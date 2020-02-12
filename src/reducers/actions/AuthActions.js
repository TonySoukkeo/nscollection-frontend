import { LOGIN_USER } from "../constants/AuthConstants";
import axios from "axios";

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
    const newUser = await axios({
      method: "post",
      url: "http://localhost:3000/auth/register",
      data: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userName,
        allowEmail
      }
    });

    return {
      status: newUser.status,
      message: newUser.message
    };
  } catch (err) {
    return {
      status: err.statusCode,
      message: err.message
    };
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
    )
      .then(res => res.json())
      .then(data => data);

    if (usernameExists.status !== 200) {
      const error = new Error();
      error.message = usernameExists.message;
      error.field = "userName";
      error.status = usernameExists.status;

      throw error;
    }

    return {
      message: usernameExists.data.message,
      field: "userName"
    };
  } catch (err) {
    throw err;
  }
};
