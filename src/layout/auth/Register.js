import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import RegisterForm from "../../components/register/RegisterForm";

// Actions
import {
  registerUser,
  validateUsername
} from "../../reducers/actions/AuthActions";

// Custom hooks
import useError from "../../hooks/useError";
import useInputs from "../../hooks/useInputs";
import useIsLoading from "../../hooks/useIsLoading";

// Context
import { StateContext } from "../../context/StateProvider";

const Register = ({ history }) => {
  const { setError, errorMessage, fieldErr, error } = useError();

  const [userNameCheck, setUserNameCheck] = useState({ validUsername: "" });

  const [formSubmit, setFormSubmit] = useState(false);

  const { validUsername } = userNameCheck;

  const { loading, setLoading } = useIsLoading();

  const { isAuth } = useContext(StateContext);

  const {
    userName,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    allowEmail,
    setInput,
    input
  } = useInputs();

  useEffect(() => {
    // Prepopulate email field if necessary
    if (history.location.state && history.location.state.email) {
      setInput(prevState => ({
        ...prevState,
        email: {
          value: history.location.state.email,
          focused: true
        }
      }));
    }

    if (userName.value.length) {
      const validUsername = async () => {
        try {
          const username = await validateUsername(userName.value);

          if (username.status !== 200) {
            const error = new Error();
            error.status = username.status;
            error.message = username.message;
            error.field = username.field;

            throw error;
          }

          setUserNameCheck({
            validUsername: username.message
          });

          setError({
            ...error,
            fieldErr: null
          });
        } catch (err) {
          setUserNameCheck({
            validUsername: ""
          });

          setError({
            ...error,
            fieldErr: {
              message: err.message,
              field: err.field
            }
          });
        }
      };

      validUsername();
    }
  }, [userName.value]);

  const onChange = e => {
    setInput({
      ...input,
      [e.target.name]: {
        focused: true,
        value: e.target.value
      }
    });
  };

  // Check if user email is valid
  let validEmail;
  const emailRe = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  !emailRe.test(email.value) ? (validEmail = false) : (validEmail = true);

  // onClick function to set allowEmail
  const setAllowEmail = value => {
    setInput({
      ...input,
      allowEmail: value
    });
  };

  // Disable submit button if there are any form errors
  let btnDisable = false;

  if (
    !firstName.value ||
    !lastName.value ||
    !validEmail ||
    password.value.length < 10 ||
    password.value !== confirmPassword.value ||
    fieldErr
  ) {
    btnDisable = true;
  }

  // Onsubmit for register form
  const submitRegister = async e => {
    try {
      e.preventDefault();

      setLoading(true);

      if (errorMessage) {
        setError({ errorMessage: "" });
      }

      const newUserInfo = {
        userName: userName.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        allowEmail
      };

      await registerUser(newUserInfo);

      setLoading(false);
      setFormSubmit(true);
    } catch (err) {
      setError({ errorMessage: err.message });

      window.scrollTo(0, 0);
    }
  };

  return (
    <Route
      render={() =>
        !isAuth ? (
          <React.Fragment>
            {!formSubmit ? (
              <SubNavigation history={history} title="Register" />
            ) : null}

            <section className="register">
              {errorMessage ? (
                <div className="alert alert--error mb-sm">{errorMessage}</div>
              ) : null}

              {!formSubmit ? (
                <React.Fragment>
                  <h1 className="register__title">Register</h1>
                  <RegisterForm
                    validUsername={validUsername}
                    onChange={onChange}
                    fieldErr={fieldErr}
                    userName={userName}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    validEmail={validEmail}
                    password={password}
                    confirmPassword={confirmPassword}
                    setAllowEmail={setAllowEmail}
                    btnDisable={btnDisable}
                    submitRegister={submitRegister}
                    isLoading={loading}
                  />
                </React.Fragment>
              ) : (
                <div className="register__confirmation">
                  <div className="register__confirmation--icon">
                    <i className="far fa-paper-plane"></i>
                  </div>
                  <h2>Email confirmation sent!</h2>

                  <p>Please confirm your email to activate your account.</p>

                  <p>
                    Once activated, you may <Link to="/login">login</Link>
                  </p>
                </div>
              )}
            </section>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Register;
