import React from "react";

// Custom hooks
import usePath from "../../hooks/usePath";

// Components
import ShowcaseDisplay from "../../components/home/ShowcaseDisplay";

const Home = () => {
  // Set path name for bottom navigation active items
  usePath();

  return (
    <section className="home">
      {/**** Game showcase ****/}
      <ShowcaseDisplay />
    </section>
  );
};

export default Home;
