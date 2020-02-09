import React from "react";

const Home = () => {
  return (
    <section className="home">
      {/**** Game showcase ****/}
      <div className="game-showcase">
        <div className="game-showcase--box game-showcase__new">
          New releases
        </div>
        <div className="game-showcase--box game-showcase__coming-soon">
          Coming Soon
        </div>
        <div className="game-showcase--box game-showcase__sale">Sale</div>
        <div className="game-showcase--box game-showcase__demo">Demos</div>

        <div className="game-showcase--box game-showcase__all">All Games</div>
      </div>
    </section>
  );
};

export default Home;
