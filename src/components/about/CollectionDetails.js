import React from "react";

const CollectionDetails = () => {
  return (
    <section className="about__collection container">
      <h2 className="about--header">
        You can view each of your game lists under the box icon.
      </h2>
      <div className="about--grid">
        <div className="about--image about--image-collection"></div>
        <p className="about--header-text">
          Add games to either of your collection list by going to a selected
          game, and choosing one of the three options shown here.
        </p>
      </div>
    </section>
  );
};

export default CollectionDetails;
