import React from "react";
import { Link } from "react-router-dom";

const FooterNavigation = () => {
  return (
    <ul className="footer__navigation">
      <Link to="/">
        <li>Home</li>
      </Link>

      <Link
        to={{
          pathname: "/browse",
          state: { all: true }
        }}
      >
        <li>Games</li>
      </Link>

      <Link to="/about">
        <li>About</li>
      </Link>
    </ul>
  );
};

export default FooterNavigation;
