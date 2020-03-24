import React from "react";

// Components
import Intro from "../../components/about/Intro";
import SearchDetails from "../../components/about/SearchDetails";

const About = () => {
  return (
    <section className="about">
      <Intro />
      <SearchDetails />
    </section>
  );
};

export default About;
