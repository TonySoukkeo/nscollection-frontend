import React, { useContext } from "react";
import { Helmet } from 'react-helmet'

// Custom hooks
import usePath from "../../hooks/usePath";

// Context
import { StateContext } from "../../context/StateProvider";

// Components
import ShowcaseDisplay from "../../components/home/ShowcaseDisplay";
import Banner from "../../components/home/Banner";
import Features from "../../components/home/Features";
import SearchFeatures from "../../components/home/SearchFeatures";
import Signup from "../../components/home/Signup";

const Home = () => {
  const { isAuth } = useContext(StateContext);

  // Set path name for bottom navigation active items
  usePath();

  return (
    <section className="home">
      <Helmet>
        <title>NS Collection | Home</title>
        <meta name="description" content="Nintendo Switch virtual game collection library. Search for any nintendo switch games and add them to your collection."/>
      </Helmet>
      {/**** Banner ****/}
      <Banner />

      {/**** Features ****/}
      <Features />
      <SearchFeatures />

      {/**** Game showcase ****/}
      <ShowcaseDisplay />

      {/**** Signup ****/}
      {!isAuth ? <Signup /> : null}
    </section>
  );
};

export default Home;
