import { LOGIN_USER } from '../constants/AuthConstants';
import axios from 'axios';

export const registerUser = ({firstName, lastName, email, password, confirmPassword, userName}) => {
  try {
    const newUser = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/register',
      data: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userName
      }
    });

    return {
      status: newUser.status,
      message: newUser.message
    }

  } catch(err) {
    return {
      status: err.statusCode,
      message: err.message
    }
  }
}