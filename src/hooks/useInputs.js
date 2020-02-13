import { useState } from "react";

const inputState = {
  firstName: { value: "", focused: false },
  lastName: { value: "", focused: false },
  password: { value: "", focused: false },
  confirmPassword: { value: "", focused: false },
  email: { value: "", focused: false },
  userName: { value: "", focused: false },
  validUsername: "",
  allowEmail: false
};

const useInputs = () => {
  const [input, setInput] = useState(inputState);

  const {
    userName,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    allowEmail,
    validUsername
  } = input;

  return {
    userName,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    allowEmail,
    validUsername,
    setInput,
    input
  };
};

export default useInputs;
