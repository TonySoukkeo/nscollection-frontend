import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Actions
import { confirmEmail } from "../../reducers/actions/AuthActions";

// Components
import Loading from "../../components/loading/Loading";

// Custom hooks
import useError from "../../hooks/useError";

const ConfirmEmail = ({ location }) => {
  const [verified, setVerified] = useState(false);
  const { setError, errorMessage, error } = useError();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const token = params.get("token");

    const verify = async () => {
      try {
        const verifyEmail = await confirmEmail(token, id);

        if (verifyEmail.status !== 200) {
          const error = new Error();
          error.status = verifyEmail.status;
          error.message = verifyEmail.message;

          throw error;
        }

        setVerified(true);
      } catch (err) {
        setError({
          ...error,
          errorMessage: err.message
        });
      }
    };

    verify();
  }, []);

  return (
    <section className="confirm-email">
      {verified ? (
        <div className="confirm-email__verified">
          <span className="confirm-email__verified-icon">
            <i className="fas fa-check-double"></i>
          </span>

          <h2>You are now verified!</h2>

          <p>Click the link below to login</p>
          <Link to="/login">Login</Link>
        </div>
      ) : !verified && errorMessage ? (
        <div className="confirm-email__invalid">
          <p>{errorMessage}</p>
          <Link to="/resend">Resend email verification link</Link>
        </div>
      ) : (
        <Loading styles={{ width: "20%" }} />
      )}
    </section>
  );
};

export default ConfirmEmail;
