import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import TextInput from "../../components/inputs/TextInput";
import RadioInput from "../../components/inputs/RadioInput";

// Actions
import {
  registerUser,
  validateUsername
} from "../../reducers/actions/AuthActions";

const state = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  email: "",
  userName: "",
  firstNameFocused: false,
  lastNameFocused: false,
  userNameFocused: false,
  emailFocused: false,
  passwordFocused: false,
  confirmPasswordFocused: false,
  allowEmail: false,
  fieldErr: null
};

const Register = () => {
  const [input, setInput] = useState(state);
  const {
    userName,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    allowEmail,
    fieldErr,
    userNameFocused,
    emailFocused,
    passwordFocused,
    confirmPasswordFocused,
    firstNameFocused,
    lastNameFocused
  } = input;

  const onChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // Check if user email is valid
  let validEmail;
  const emailRe = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  !emailRe.test(email) ? (validEmail = false) : (validEmail = true);

  // onClick function to set allowEmail
  const setAllowEmail = value => {
    setInput({
      ...input,
      allowEmail: value
    });
  };

  // Onsubmit for register form
  const submitRegister = e => {
    e.preventDefault();

    const newUserInfo = {
      userName,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      allowEmail
    };

    registerUser(newUserInfo);
  };

  // Set focused state for fields
  const setFocused = field => {
    setInput({
      ...input,
      [field]: true
    });
  };

  // Check if username exsits
  const checkUsername = async () => {
    try {
      const test = await validateUsername(userName);
    } catch (err) {
      setInput({
        ...input,
        userNameFocused: true,
        fieldErr: {
          message: err.message,
          field: err.field
        }
      });
    }
  };

  let btnDisable = false;

  if (
    !firstName ||
    !lastName ||
    !validEmail ||
    password.length < 10 ||
    password !== confirmPassword
  ) {
    btnDisable = true;
  }

  return (
    <React.Fragment>
      <SubNavigation title="Register" />

      <section className="register">
        <form autoComplete="off" onSubmit={submitRegister} className="form">
          <TextInput
            focused={userNameFocused}
            onChange={onChange}
            label="Username"
            labelId="userName"
            type="text"
            name="userName"
            onChange={onChange}
            onBlur={checkUsername}
            maxLength="15"
            err={fieldErr}
            errText={fieldErr && fieldErr.message}
            validField={userName.length > 3 && userName.length < 15}
          />

          <TextInput
            onFocus={() => setFocused("firstNameFocused")}
            focused={firstNameFocused}
            label="First Name"
            labelId="firstName"
            type="text"
            onChange={onChange}
            err={firstName.length < 2}
            errText="First name is too short"
            validField={firstName.length > 1}
          />

          <TextInput
            onFocus={() => setFocused("lastNameFocused")}
            focused={lastNameFocused}
            label="Last Name"
            labelId="lastName"
            type="text"
            onChange={onChange}
            err={lastName.length < 2}
            errText="Last name is too short"
            validField={lastName.length > 1}
          />

          <TextInput
            focused={emailFocused}
            onFocus={() => setFocused("emailFocused")}
            label="Email"
            labelId="email"
            type="email"
            err={!validEmail}
            errText="Enter a valid email"
            onChange={onChange}
            validField={validEmail}
          />

          <TextInput
            focused={passwordFocused}
            onFocus={() => setFocused("passwordFocused")}
            label="Password"
            labelId="password"
            type="password"
            err={password.length < 10}
            errText="Password must be at least 10 characters long"
            onChange={onChange}
            validField={password.length > 9}
          />

          <TextInput
            focused={confirmPasswordFocused}
            onFocus={() => setFocused("confirmPasswordFocused")}
            label="Confirm Password"
            labelId="confirmPassword"
            type="password"
            err={password !== confirmPassword}
            errText="Passwords do not match"
            onChange={onChange}
            validField={password === confirmPassword}
          />

          <h2 className="mb-sm mt-md">
            Would you like to recieve email notifications when your games goes
            on sale?
          </h2>

          <div className="form__group d-flex">
            <RadioInput
              labelFor="optIn"
              name="allowEmail"
              text="Yes"
              value={true}
              type="radio"
              onClick={setAllowEmail}
            />

            <RadioInput
              labelFor="optOut"
              name="allowEmail"
              text="No"
              value={false}
              type="radio"
              onClick={setAllowEmail}
            />
          </div>

          <div className="form__actions mt-md">
            <Link to="/login">Already have an account? Login here.</Link>
            <button
              disabled={btnDisable}
              className={
                btnDisable
                  ? "btn btn--register btn--disabled"
                  : "btn btn--register"
              }
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default Register;
