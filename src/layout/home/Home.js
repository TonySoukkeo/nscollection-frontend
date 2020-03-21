import React from "react";

// Custom hooks
import usePath from "../../hooks/usePath";

// Components
import ShowcaseDisplay from "../../components/home/ShowcaseDisplay";
import Banner from "../../components/home/Banner";
import Features from "../../components/home/Features";
import SearchFeatures from "../../components/home/SearchFeatures";
import Signup from "../../components/home/Signup";

const Home = () => {
  // Set path name for bottom navigation active items
  usePath();

  return (
    <section className="home">
      {/**** Banner ****/}
      <Banner />

      {/**** Features ****/}
      <Features />
      <SearchFeatures />

      {/**** Game showcase ****/}
      <ShowcaseDisplay />

      {/**** Signup ****/}
      <Signup />
    </section>
  );
};

export default Home;
