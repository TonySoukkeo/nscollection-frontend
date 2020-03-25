import React from "react";

const NotificationsDetails = () => {
  return (
    <section className="about__notifications">
      <div className="about--grid container">
        <p className="about--header-text">
          Any games that goes on sale that are currently in your sale watch list
          will alert you on your navigation bar.
        </p>
        <div className="about--image about--image-notifications"></div>
      </div>
      <h2 className="about--header">
        You can change your email permissions in your profile under settings.
      </h2>
      <div className="container">
        <div className="about--image about--image-permissions"></div>
      </div>
    </section>
  );
};

export default NotificationsDetails;
