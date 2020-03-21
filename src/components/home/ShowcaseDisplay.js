import React from "react";
import { Link } from "react-router-dom";

const ShowcaseDisplay = () => {
  return (
    <div className="game-showcase">
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
          points="1242.03,0.639 1242.03,0.639 -0.03,137.574 0.03,0.092 "
        />
      </svg>
      <h1 className="game-showcase__title">Start browsing for some games</h1>

      <Link
        to={{
          pathname: "/browse",
          state: {
            newRelease: true
          }
        }}
        className="game-showcase--box game-showcase__new"
      >
        <h1 className="text-box text-box--dark">New</h1>
        <br />
        <h1 className="text-box text-box--dark">Releases</h1>
      </Link>

      <Link
        to={{
          pathname: "/browse",
          state: { comingSoon: true }
        }}
        className="game-showcase--box game-showcase__coming-soon"
      >
        <h1 className="text-box text-box--dark">Coming</h1>
        <br />
        <h1 className="text-box text-box--dark">Soon</h1>
      </Link>

      <Link
        to={{
          pathname: "/browse",
          state: { sale: true }
        }}
        className="game-showcase--box game-showcase__sale"
      >
        <h1 className="text-box text-box--dark">Sales</h1>
      </Link>

      <Link
        to={{
          pathname: "/browse",
          state: { demo: true }
        }}
        className="game-showcase--box game-showcase__demo"
      >
        <h1 className="text-box text-box--dark">Demos</h1>
      </Link>

      <Link
        to={{
          pathname: "/browse",
          state: { all: true }
        }}
        className="game-showcase--box game-showcase__all"
      >
        <h1 className="text-box text-box--dark">All Games</h1>
      </Link>

      <Link
        to={{
          pathname: "/browse",
          state: { all: true }
        }}
        className="game-showcase__view-all"
      >
        View all games
      </Link>
    </div>
  );
};

export default ShowcaseDisplay;
