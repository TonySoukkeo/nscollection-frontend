import React from "react";

const Features = () => {
  return (
    <section className="home__features">
      <div className="home__features-content container">
        <div className="home__features-1">
          <p>
            Keep track of the games that you own. By searching for that specific
            game and adding it to your collection!
          </p>
        </div>
        <div className="home__features-2">
          <p>
            See a game that is coming soon? Or a game that you really want? Keep
            track of all interested games in your wishlist!
          </p>
        </div>
        <div className="home__features-3">
          <p>
            Get notified on any games that goes on sale, by adding them to your
            sale watch list.
          </p>
        </div>
      </div>
      <svg
        version="1.1"
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 1242 136.482"
        enable-background="new 0 0 1242 136.482"
      >
        <polygon
          fill="#EAECEB"
          points="0,136.982 0,136.982 1242,-0.5 1242,136.982 "
        />
      </svg>
    </section>
  );
};

export default Features;
