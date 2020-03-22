import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import ChangePassword from "../../components/profile/ChangePassword";
import Loading from "../../components/loading/Loading";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import usePath from "../../hooks/usePath";
import useInputs from "../../hooks/useInputs";
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

const EditProfile = () => {
  const [pwChanged, setPwChanged] = useState(false);
  const [allowEmail, setAllowEmail] = useState(false);

  const { isAuth, token, user } = useContext(StateContext);

  const { password, confirmPassword, setInput, input } = useInputs();

  const { errorMessage, setError } = useError();
  const { loading, setLoading, loadingType, setLoadingType } = useIsLoading();

  useEffect(() => {
    setAllowEmail(user && user.allowEmail);
  }, [user]);

  usePath();

  // Form submit
  const submitChanges = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setLoadingType("change password");
      setError({
        errorMessage: ""
      });
      // Make api call
      const changes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/auth/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            password: password.value
          })
        }
      );

      const data = await changes.json();

      if (data.status !== 200) {
        const error = new Error();
        error.message = data.message;

        throw error;
      }

      // Reset password / confirm password field
      setInput(prevInput => ({
        ...prevInput,
        password: {
          value: "",
          focused: false
        },
        confirmPassword: {
          value: "",
          focused: false
        }
      }));

      setPwChanged(true);

      setLoadingType("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setLoadingType("");
      setError({
        errorMessage: err.message
      });
    }
  };

  const onChange = e => {
    setInput({
      ...input,
      [e.target.name]: {
        focused: true,
        value: e.target.value
      }
    });
  };

  const emailPermissionsOnChange = async e => {
    try {
      setLoading(true);
      setLoadingType("allow email");

      const permissions = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/permissions`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const permissionsData = await permissions.json();

      // Check for errors
      if (permissionsData.status !== 201) {
        const error = new Error();
        error.message = permissionsData.message;

        throw error;
      }

      setAllowEmail(!allowEmail);
      setLoading(false);
      setLoadingType("");
    } catch (err) {
      setLoading(false);
      setLoadingType("");
      setError({ errorMessage: err.message });
    }
  };

  let disabled = false;

  if (!password.value || !confirmPassword.value) disabled = true;
  if (password.value !== confirmPassword.value) disabled = true;

  return (
    <Route
      render={() =>
        isAuth ? (
          <React.Fragment>
            <SubNavigation title="Edit Profile" />
            <section className="profile profile__edit-page container">
              {errorMessage ? (
                <div className="alert alert--error">{errorMessage}</div>
              ) : null}

              {pwChanged ? (
                <div className="profile__edit-page__success">
                  <p>Password has been successfully changed!</p>
                </div>
              ) : null}

              {/**************************
               * UPDATE EMAIL PERMISSIONS
               ***************************/}
              <div className="form__group">
                <div className="email-permissions">
                  <label
                    className="email-permissions__label"
                    htmlFor="allowEmail"
                  >
                    <h2>Email me when games go on sale</h2>
                  </label>
                  {loading && loadingType === "allow email" ? (
                    <Loading styles={{ width: "2rem" }} />
                  ) : (
                    <input
                      className="email-permissions__input"
                      id="#allowEmail"
                      type="checkbox"
                      value={allowEmail}
                      name="allowEmail"
                      onChange={emailPermissionsOnChange}
                      checked={allowEmail}
                    />
                  )}
                </div>
              </div>

              {/*********************
               * UPDATE PASSWORD FORM
               **********************/}
              <form onSubmit={submitChanges} className="form">
                {/*** Change password inputs ***/}
                <ChangePassword
                  loading={loading}
                  onChange={onChange}
                  password={password}
                  confirmPassword={confirmPassword}
                />
                {loading && loadingType === "change password" ? (
                  <Loading styles={{ width: "3rem" }} />
                ) : (
                  <button
                    type="submit"
                    disabled={disabled}
                    className={disabled ? "btn btn--disabled" : "btn btn--edit"}
                  >
                    Update password
                  </button>
                )}
              </form>
            </section>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default EditProfile;
