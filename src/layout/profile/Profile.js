import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import usePath from "../../hooks/usePath";

const Profile = () => {
  const { isAuth } = useContext(StateContext);

  // Set path name for bottom navigation active items
  usePath();

  let display;

  if (!isAuth) {
    display = (
      <React.Fragment>
        <h1>Register or log in to view your profile page</h1>
        <div className="btn-group btn-group--col">
          <Link className="btn btn--login" to="/login">
            Login
          </Link>

          <Link className="btn btn--register" to="/register">
            Register
          </Link>
        </div>
      </React.Fragment>
    );
  } else {
    display = <React.Fragment>My profile</React.Fragment>;
  }

  return <section className="profile">{display}</section>;
};

export default Profile;
