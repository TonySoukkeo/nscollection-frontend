import React from "react";
import { Link } from "react-router-dom";

const ShowcaseDisplay = () => {
  return (
    <div className="game-showcase">
      <Link
        to="/browse?new-release=true"
        className="game-showcase--box game-showcase__new"
      >
        <h1 className="text-box text-box--dark">New</h1>
        <br />
        <h1 className="text-box text-box--dark">Releases</h1>
      </Link>
      <Link
        to="/browse?coming-soon=true"
        className="game-showcase--box game-showcase__coming-soon"
      >
        <h1 className="text-box text-box--dark">Coming</h1>
        <br />
        <h1 className="text-box text-box--dark">Soon</h1>
      </Link>
      <Link
        to="/browse?sales=true"
        className="game-showcase--box game-showcase__sale"
      >
        <h1 className="text-box text-box--dark">Sales</h1>
      </Link>
      <Link
        to="/browse?demo=true"
        className="game-showcase--box game-showcase__demo"
      >
        <h1 className="text-box text-box--dark">Demos</h1>
      </Link>

      <Link to="/browse" className="game-showcase--box game-showcase__all">
        <h1 className="text-box text-box--dark">All Games</h1>
      </Link>
    </div>
  );
};

export default ShowcaseDisplay;
