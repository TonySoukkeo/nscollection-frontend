import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="home__signup container">
      <h1>Start building up your collection!</h1>

      <Link to="/register" className="btn">
        <p>Sign up</p>
      </Link>
    </section>
  );
};

export default Signup;
