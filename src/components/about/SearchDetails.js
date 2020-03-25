import React from "react";

const SearchDetails = () => {
  return (
    <section className="about__search">
      <div className="about__search-content container">
        <h2 className="about--header">
          Nintendo Switch Collection lets you search for games that are
          currently out or coming soon.
          <span>
            * Results that are shown are only games that are available to the NA
            region. Pricing, also is affected by this, as it only pertains to NA
          </span>
        </h2>

        <div className="about__search about--grid">
          <div className="about--image about--image-search"></div>
          <p className="about--header-text">
            You can perform basic search functions, by typing in the search bar
            or page. Along with that, you can also narrow your search down as
            well, including: Price range, demos, online play, cloud save or
            games that are coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchDetails;
