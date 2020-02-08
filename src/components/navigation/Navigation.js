import React from "react";
import Logo from "../../assets/images/nscollection_logo.png";

const Navigation = () => {
  return (
    <nav className="main-nav container">
      <img className="logo" src={Logo} alt="NSCollection logo" />

      <a href="/" className="main-nav--about-icon">
        ?
      </a>
    </nav>
  );
};

export default Navigation;
