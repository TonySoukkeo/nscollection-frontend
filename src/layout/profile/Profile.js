import React, { useContext } from "react";
import { Link, Route, Redirect } from "react-router-dom";

// Context
import { StateContext, DispatchContext } from "../../context/StateProvider";

// Custom hooks
import usePath from "../../hooks/usePath";

// Actions
import { setAuth } from "../../reducers/actions/AuthActions";

// Components
import Loading from "../../components/loading/Loading";

const Profile = () => {
  const { isAuth, user } = useContext(StateContext);
  const { authDispatch } = useContext(DispatchContext);

  // Set path name for bottom navigation active items
  usePath();

  // Sign user out
  const logout = () => {
    // Remove token and userId from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Reset isAuth and token on global state
    setAuth(
      {
        isAuth: false,
        token: ""
      },
      authDispatch
    );
  };

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
          <Link className="profile__auth-link" to="/login">
            Login
          </Link>

          <Link className="profile__auth-link" to="/register">
            Register
          </Link>
        </div>
      </React.Fragment>
    );
  } else if (user) {
    display = (
      <React.Fragment>
        <Link to="/profile?edit=true" className="profile__edit">
          <span>
            <i className="fas fa-cog"></i>
          </span>
          <h4>Edit Profile</h4>
        </Link>

        <Link to="/collection" className="profile__collection">
          <span>
            <i className="fas fa-box-open"></i>
          </span>
          <h4>My Collection</h4>
        </Link>

        <Link to="/collection?wishlist=true" className="profile__wishlist">
          <span>
            <i className="far fa-list-alt"></i>
          </span>
          <h4>Wishlist</h4>
        </Link>

        <Link to="/collection?salewatch=true" className="profile__salewatch">
          <span>
            <i className="fas fa-file-invoice-dollar"></i>
          </span>

          <h4>Sale Watch</h4>
        </Link>

        <Link
          to="/profile?notifications=true"
          className="profile__notifications"
        >
          <span>
            <i className="far fa-bell"></i>
          </span>

          <div
            className={
              user && user.notifications && user.notifications.count > 0
                ? "profile__notifications-count profile__notifications-count--green"
                : "profile__notifications-count"
            }
          >
            {user && user.notifications && user.notifications.count}
          </div>
          <h4>Notifications</h4>
        </Link>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {isAuth ? (
        <div className="profile__header">
          <span className="profile__header-username">{user.userName}</span>
          <span onClick={logout} className="profile__header-signout">
            Sign out
          </span>
        </div>
      ) : null}

      <section className={isAuth ? "profile d-flex col-2" : "profile"}>
        {display}
      </section>
    </React.Fragment>
  );
};

export default Profile;
