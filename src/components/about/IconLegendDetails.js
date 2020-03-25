import React from "react";

const IconLegendDetails = () => {
  return (
    <section className="about__legend container">
      <div className="about--grid">
        <p className="about--header-text">
          When searching for a game, if you see an "online" image or "cloud"
          icon. It means that game supports online or cloud save, respective to
          its associative icon image.
        </p>

        <div className="about--image about--image-legend"></div>
      </div>
    </section>
  );
};

export default IconLegendDetails;
