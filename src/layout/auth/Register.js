import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import TextInput from "../../components/inputs/TextInput";

const state = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  email: ""
};

const Register = () => {
  const [input, setInput] = useState(state);
  const { firstName, lastName, password, confirmPassword, email } = input;

  const onChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // Check if user email is valid
  let validEmail;
  const emailRe = /^\S+@\S+\.\S+$/gi;

  !emailRe.test(email) ? (validEmail = true) : (validEmail = false);

  return (
    <React.Fragment>
      <SubNavigation title="Register" />

      <section className="register">
        <form className="form">
          <TextInput
            label="First Name"
            labelId="firstName"
            type="text"
            onChange={onChange}
          />

          <TextInput
            label="Last Name"
            labelId="lastName"
            type="text"
            onChange={onChange}
          />

          <TextInput
            label="Email"
            labelId="email"
            type="email"
            err={validEmail}
            errText="Enter a valid email"
            onChange={onChange}
          />

          <TextInput
            label="Password"
            labelId="password"
            type="password"
            err={password.length < 10}
            errText="Password must be at least 10 characters long"
            onChange={onChange}
          />

          <TextInput
            label="Confirm Password"
            labelId="confirmPassword"
            type="password"
            err={password !== confirmPassword}
            errText="Passwords do not match"
            onChange={onChange}
          />

          <div className="form__actions mt-md">
            <Link to="/login">Already have an account? Login here.</Link>
            <button className="btn btn--register" type="submit">
              Register
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default Register;
