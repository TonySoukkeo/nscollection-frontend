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
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err));

    if (newUser.status !== 200) {
      const error = new Error();
      error.statusCode = newUser.status;
      error.message = newUser.message;

      throw error;
    }

    return {
      status: newUser.status,
      message: newUser.message
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
      message: usernameExists.message,
      field: "userName",
      status: usernameExists.status
    };
  } catch (err) {
    return err;
  }
};
