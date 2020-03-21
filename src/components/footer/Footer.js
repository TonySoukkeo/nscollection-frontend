import React from "react";

// Components
import Logo from "../../assets/images/nscollection_logo.png";
import FooterNavigation from "./FooterNavigation";

const Footer = () => {
  return (
    <footer className="footer container">
      {/*** Logo ***/}
      <img className="footer__logo" src={Logo} alt="NSCollection" />

      {/*** Horizontal line ***/}
      <div className="footer__line"></div>

      {/*** Footer Navigation ***/}
      <FooterNavigation />

      {/*** Copyright ***/}
      <p className="footer__copyright">&copy; 2020 Tony Soukkeo Designs</p>
    </footer>
  );
};

export default Footer;
