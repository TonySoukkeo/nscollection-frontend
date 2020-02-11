import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BottomNavigation = () => {
  const [{ path }, setPath] = useState({ path: "/" });

  const currentPath = window.location.pathname;

  useEffect(() => {
    setPath({ path: window.location.pathname }, [path]);
  }, [path]);

  return (
    <nav className="bottom-navigation">
      <Link
        onClick={() => setPath(currentPath)}
        className="bottom-navigation__link"
        to="/"
      >
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
        onClick={() => setPath(currentPath)}
        className="bottom-navigation__link"
        to="/collection"
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

      <Link
        onClick={() => setPath(currentPath)}
        className="bottom-navigation__link"
        to="/search"
      >
        <i
          className={
            path === "/search"
              ? "bottom-navigation--icon bottom-navigation--icon-active fas fa-search"
              : "bottom-navigation--icon fas fa-search"
          }
        ></i>
        <div
          className={
            path === "/search"
              ? "bottom-navigation__tab bottom-navigation__tab--active"
              : "bottom-navigation__tab"
          }
        ></div>
      </Link>

      <Link
        onClick={() => setPath(currentPath)}
        className="bottom-navigation__link"
        to="/profile"
      >
        <i
          className={
            path === "/profile" || path === "/register" || path === "/login"
              ? "bottom-navigation--icon bottom-navigation--icon-active fas fa-user"
              : "bottom-navigation--icon fas fa-user"
          }
        ></i>
        <div
          className={
            path === "/profile" || path === "/register" || path === "/login"
              ? "bottom-navigation__tab bottom-navigation__tab--active"
              : "bottom-navigation__tab"
          }
        ></div>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
