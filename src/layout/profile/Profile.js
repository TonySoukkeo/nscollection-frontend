import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import usePath from "../../hooks/usePath";

const Profile = () => {
  const { isAuth, user } = useContext(StateContext);
  console.log(user);
  // Set path name for bottom navigation active items
  usePath();

  let display;

  if (!isAuth) {
    display = (
      <React.Fragment>
        <h1>
          <span style={{ color: "#f15e55" }}>Register</span> or{" "}
          <span style={{ color: "#10b0d5" }}>Log in</span>
        </h1>
        <p>to view your profile page</p>

        <div className="btn-group btn-group--col mt-md">
          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>
        </div>
      </React.Fragment>
    );
  } else {
    display = <React.Fragment>My profile</React.Fragment>;
  }

  return <section className="profile">{display}</section>;
};

export default Profile;
