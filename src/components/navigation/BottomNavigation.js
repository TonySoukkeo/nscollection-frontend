import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Context
import { StateContext } from "../../context/StateProvider";

const BottomNavigation = () => {
  const { path, notificationCount } = useContext(StateContext);

  return (
    <nav className="bottom-navigation">
      <Link className="bottom-navigation__link" to="/">
        <i
          className={
            path === "/"
              ? "bottom-navigation--icon bottom-navigation--icon-active fas fa-home"
              : "bottom-navigation--icon fas fa-home"
          }
        ></i>

        <div
          className={
            path === "/"
              ? "bottom-navigation__tab bottom-navigation__tab--active"
              : "bottom-navigation__tab"
          }
        ></div>
      </Link>

      <Link
        className="bottom-navigation__link"
        to="/collection?view=collection"
      >
        <i
          className={
            path === "/collection"
              ? "bottom-navigation--icon bottom-navigation--icon-active fas fa-box"
              : "bottom-navigation--icon fas fa-box"
          }
        ></i>

        <div
          className={
            path === "/collection"
              ? "bottom-navigation__tab bottom-navigation__tab--active"
              : "bottom-navigation__tab"
          }
        ></div>
      </Link>

      <Link className="bottom-navigation__link" to="/search">
        <i
          className={
            path === "/search" || path === "/browse"
              ? "bottom-navigation--icon bottom-navigation--icon-active fas fa-search"
              : "bottom-navigation--icon fas fa-search"
          }
        ></i>
        <div
          className={
            path === "/search" || path === "/browse"
              ? "bottom-navigation__tab bottom-navigation__tab--active"
              : "bottom-navigation__tab"
          }
        ></div>
      </Link>

      <Link className="bottom-navigation__link" to="/profile">
        <i
          className={
            path === "/profile" ||
            path === "/register" ||
            path === "/login" ||
            path === "/edit-profile"
              ? "bottom-navigation--icon bottom-navigation--icon-active fas fa-user"
              : "bottom-navigation--icon fas fa-user"
          }
        ></i>
        <div
          className={
            path === "/profile" ||
            path === "/register" ||
            path === "/login" ||
            path === "/edit-profile"
              ? "bottom-navigation__tab bottom-navigation__tab--active"
              : "bottom-navigation__tab"
          }
        ></div>
        <span
          className={
            notificationCount > 0
              ? "notifications notifications--mobile-active"
              : "notifications"
          }
        >
          {notificationCount}
        </span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
