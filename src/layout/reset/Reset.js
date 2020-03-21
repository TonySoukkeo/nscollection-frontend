import React, { useContext, useState } from "react";
import { Route, Redirect, Link } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import TextInput from "../../components/inputs/TextInput";
import Loading from "../../components/loading/Loading";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

const Reset = () => {
  const [update, setUpdate] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const { errorMessage, setError } = useError();
  const { loading, setLoading } = useIsLoading();

  let display;
  const { isAuth } = useContext(StateContext);

  const onChange = e => {
    setEmail(e.target.value);
  };

  const onSubmit = type => async e => {
    try {
      e.preventDefault();

      let data;

      switch (type) {
        case "password":
          setLoading(true);
          const pwResetResponse = await fetch(
            "http://localhost:3000/auth/password-reset",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email })
            }
          );

          data = await pwResetResponse.json();

          setLoading(false);

          if (data.status !== 200) {
            const error = new Error();
            error.message = data.message;

            throw error;
          }
          setLoading(false);

          setSuccess(data.message);
          return;

        case "email":
          setLoading(true);
          const verifyResetResponse = await fetch(
            "http://localhost:3000/auth/resend",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email })
            }
          );

          data = await verifyResetResponse.json();
          setLoading(false);
          if (data.status !== 200) {
            const error = new Error();
            error.message = data.message;

            throw error;
          }
          setLoading(false);

          setSuccess(data.message);
          return;

        default:
          return;
      }
    } catch (err) {
      setError({ errorMessage: err.message });
    }
  };

  if (success) {
    display = (
      <React.Fragment>
        <div className="alert alert--success">{success}</div>
        <Link className="reset__success-link" to="/">
          Back to home
        </Link>
      </React.Fragment>
    );
  } else if (update) {
    display = (
      <React.Fragment>
        <h3 className="mb-sm">
          {update === "password"
            ? "Password reset link will be sent to provided email"
            : "Resend email verification"}
        </h3>
        <form
          className="form"
          onSubmit={
            update === "email" ? onSubmit("email") : onSubmit("password")
          }
        >
          <TextInput
            onChange={onChange}
            placeholder="Enter in your email address"
            type="email"
          />
          {errorMessage ? (
            <span className="reset--err-text">{errorMessage}</span>
          ) : null}

          <div className="d-flex d-flex--flex-end">
            {loading ? (
              <Loading styles={{ width: "10%" }} />
            ) : (
              <button className="reset-submit-btn" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </React.Fragment>
    );
  } else {
    display = (
      <React.Fragment>
        <div className="btn-group mt-md">
          <button className="reset-btn" onClick={() => setUpdate("password")}>
            Password Reset
          </button>
          <button className="reset-btn" onClick={() => setUpdate("email")}>
            Resend email confirmation
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <Route
      render={() =>
        !isAuth ? (
          <React.Fragment>
            {!success ? <SubNavigation /> : null}

            <section className="reset">{display}</section>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Reset;
