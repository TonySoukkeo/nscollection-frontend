import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import TextInput from "../../components/inputs/TextInput";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    loginHandle: "",
    password: ""
  });

  const { loginHandle, password } = loginInfo;

  const loginUser = e => {
    e.preventDefault();

    console.log("Log in");
  };

  const onChange = e => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="login">
      <form className="form" onSubmit={loginUser}>
        <div className="form__group">
          <TextInput
            placeholder="Email or Username"
            type="text"
            onChange={onChange}
            name="loginHandle"
            value={loginHandle}
          />
        </div>

        <div className="form__group">
          <TextInput
            placeholder="Password"
            type="password"
            onChange={onChange}
            name="password"
            value={password}
          />
        </div>

        <div className="d-flex d-flex--justify">
          <Link to="/reset" className="login__pwreset">
            Forgot password? Or need a new email verification link?
          </Link>

          <button
            disabled={!password || !loginHandle}
            className={
              !password || !loginHandle
                ? "btn btn--disabled "
                : "btn btn--login "
            }
          >
            Login
          </button>
        </div>
      </form>

      <h2>Don't have an account?</h2>
      <p>Click here to sign up</p>
    </section>
  );
};

export default Login;
