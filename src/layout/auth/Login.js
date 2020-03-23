import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

// Components
import TextInput from "../../components/inputs/TextInput";
import Loading from "../../components/loading/Loading";
import SubNavigation from "../../components/navigation/SubNavigation";

// Actions
import { userLogin, setAuth } from "../../reducers/actions/AuthActions";

// Custom hooks
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

// Context
import { StateContext } from "../../context/StateProvider";
import { DispatchContext } from "../../context/StateProvider";

const Login = ({ history }) => {
  const [loginInfo, setLoginInfo] = useState({
    loginHandle: "",
    password: ""
  });

  const { error, setError, errorMessage } = useError();

  const { loginHandle, password } = loginInfo;

  const { loading, setLoading } = useIsLoading();

  const { isAuth } = useContext(StateContext);
  const { authDispatch } = useContext(DispatchContext);

  const loginUser = async e => {
    try {
      e.preventDefault();

      setLoading(true);
      const login = await userLogin(loginHandle, password);

      if (login.status !== 200) {
        const error = new Error();
        error.message = login.message;
        error.field = login.field;

        throw error;
      }

      if (errorMessage) {
        setError({
          ...error,
          errorMessage: "",
          fieldErr: ""
        });
      }

      // Set local storage with userId and token
      localStorage.setItem("token", login.token);
      localStorage.setItem("userId", login.userId);

      const token = localStorage.getItem("token");

      setLoading(false);

      // Set auth to true
      setAuth({ isAuth: true, token }, authDispatch);
    } catch (err) {
      setLoading(false);

      setError({
        ...error,
        errorMessage: err.message,
        fieldErr: err.field
      });
    }

    setLoginInfo({
      loginHandle,
      password: ""
    });
  };

  const onChange = e => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Route
      render={() =>
        !isAuth ? (
          <React.Fragment>
            <SubNavigation history={history} />
            <section className="login">
              <form className="form" onSubmit={loginUser}>
                <h2>Login</h2>
                {errorMessage ? (
                  <div className="alert alert--error mb-sm">{errorMessage}</div>
                ) : null}
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

                  {loading ? (
                    <Loading styles={{ width: "5%" }} />
                  ) : (
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
                  )}
                </div>
              </form>

              <div className="login__register">
                <h2>Don't have an account?</h2>
                <p>
                  Click <Link to="/register">here</Link> to sign up
                </p>
              </div>
            </section>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Login;
