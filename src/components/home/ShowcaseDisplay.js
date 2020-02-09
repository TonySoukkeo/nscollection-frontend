import React from "react";

const ShowcaseDisplay = () => {
  return (
    <div className="game-showcase">
      <a
        href="/games?new-release=true"
        className="game-showcase--box game-showcase__new"
      >
        <h1 className="text-box text-box--dark">New</h1>
        <br />
        <h1 className="text-box text-box--dark">Releases</h1>
      </a>
      <a
        href="/games?coming-soon=true"
        className="game-showcase--box game-showcase__coming-soon"
      >
        <h1 className="text-box text-box--dark">Coming</h1>
        <br />
        <h1 className="text-box text-box--dark">Soon</h1>
      </a>
      <a
        href="/games?sales=true"
        className="game-showcase--box game-showcase__sale"
      >
        <h1 className="text-box text-box--dark">Sales</h1>
      </a>
      <a
        href="/games?demo=true"
        className="game-showcase--box game-showcase__demo"
      >
        <h1 className="text-box text-box--dark">Demos</h1>
      </a>

      <a
        href="/games?all=true"
        className="game-showcase--box game-showcase__all"
      >
        <h1 className="text-box text-box--dark">All Games</h1>
      </a>
    </div>
  );
};

export default ShowcaseDisplay;
