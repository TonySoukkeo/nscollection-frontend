import React from "react";

const ContactDetails = () => {
  return (
    <section className="about__contact container">
      <span>
        If you have any questions or feedback, feel free to email me at{" "}
        <a target="_blank" href={`mailto:${process.env.REACT_APP_EMAIL}`}>
          {process.env.REACT_APP_EMAIL}
        </a>
      </span>
    </section>
  );
};

export default ContactDetails;
