import React, { useContext, useState } from "react";
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
  const { isAuth, token } = useContext(StateContext);

  const { password, confirmPassword, setInput, input } = useInputs();

  const { errorMessage, setError } = useError();
  const { loading, setLoading } = useIsLoading();

  const [pwChanged, setPwChanged] = useState(false);

  usePath();

  // Form submit
  const submitChanges = async e => {
    try {
      e.preventDefault();
      setLoading(true);
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

      setLoading(false);
    } catch (err) {
      setLoading(false);
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

              <form onSubmit={submitChanges} className="form">
                {/*** Change password inputs ***/}
                <ChangePassword
                  loading={loading}
                  onChange={onChange}
                  password={password}
                  confirmPassword={confirmPassword}
                />
                {loading ? (
                  <Loading styles={{ width: "3rem" }} />
                ) : (
                  <button
                    type="submit"
                    disabled={disabled}
                    className={disabled ? "btn btn--disabled" : "btn btn--edit"}
                  >
                    Save
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
