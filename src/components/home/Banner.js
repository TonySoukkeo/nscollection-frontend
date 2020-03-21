import React, { useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [email, setEmail] = useState("");

  const onChange = e => {
    const value = e.target.value;

    setEmail(value);
  };

  return (
    <header className="home__banner">
      <div className="home__banner-content">
        <h1>Nintendo Switch</h1>

        <h1>Virtual Library Collection</h1>

        <h2>Start adding to your collection today!</h2>

        <div className="home__banner-form">
          <input
            onChange={onChange}
            type="email"
            placeholder="Enter your email address"
            value={email}
          />
          <Link
            to={{
              pathname: "/register",
              state: { email }
            }}
            className="btn btn--yellow"
          >
            Get Started
          </Link>
        </div>

        <p>
          <span>Free</span> to signup and <span>free</span> to use!
        </p>
      </div>

      <div className="home__banner-images">
        <div className="home__banner-images-1"></div>
        <div className="home__banner-images-2"></div>
        <div className="home__banner-images-3"></div>
      </div>

      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 1940.426 176.218"
        enable-background="new 0 0 1940.426 176.218"
      >
        <path
          fill="#EAECEB"
          d="M-9,176.218c0,0,607.448-251.555,1009.744-153.555c402.297,98,482.355,199.977,724.533,122.988
s214.158-75.988,214.158-75.988v106.555H-9z"
        />
      </svg>
    </header>
  );
};

export default Banner;
