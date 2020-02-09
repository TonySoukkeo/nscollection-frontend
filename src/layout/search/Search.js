import React from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import SearchBar from "../../components/search/SearchBar";
import SearchDisplay from "../../components/search/SearchDisplay";

const Search = () => {
  const results = [
    {
      title: "Super Mario Odyssey: Starter Pack",
      price: 59.99,
      players: "Up to 2 players",
      releaseDate: "Sep 27 2018",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-starter-pack-switch/Switch_SuperMarioOdyssey-BonusBundle_box.jpg",
      own: false
    },
    {
      title: "Super Mario Odyssey",
      price: 59.99,
      players: "Up to 2 players",
      releaseDate: "Sep 27 2018",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/Switch_SuperMarioOdyssey_box.png",
      own: true
    }
  ];

  return (
    <React.Fragment>
      <SubNavigation title="Search" />
      <section className="search">
        <SearchBar />

        <ul className="search__list">
          {results.map(result => (
            <SearchDisplay title={result.title} image={result.image} players={result.players} releaseDate={result.releaseDate} own={result.own} price={result.price} />
          ))}
        </ul>
      </section>
    </React.Fragment>
  );
};

export default Search;
