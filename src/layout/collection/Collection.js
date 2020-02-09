import React from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import GameList from "../../components/collection/GameList";

const Collection = () => {
  const games = [
    {
      title: "Animal Crossing: New Horizons",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/a/animal-crossing-new-horizons-switch/Switch_ACNH_box.png"
    },
    {
      title: "Tokyo Mirage Sessions #FE Encore",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/t/tokyo-mirage-sessions-fe-encore-switch/Switch_TokyoMirageSessionsFE-Encore_box.png"
    },
    {
      title:
        "LAYTON'S MYSTERY JOURNEY: Katrielle and the Millionaires' Conspiracy Deluxe Edition",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/l/laytons-mystery-journey-katrielle-and-the-millionaires-conspiracy-deluxe-edition-switch/Switch_LaytonsMysteryJourney_box.png"
    },
    {
      title: "The Stretchers",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/t/the-stretchers-switch/Switch_TheStretchers_box_eShop.png"
    },
    {
      title: "Luigi's Mansion 3",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/l/luigis-mansion-3-switch/Switch_LuigisMansion3_box.png"
    },
    {
      title: "Ring Fit Adventure",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/r/ring-fit-adventure-switch/Switch_RingFitAdventure_box.png"
    },
    {
      title: "The Legend of Zelda: Link's Awakening",
      image:
        "https://www.nintendo.com/content/dam/noa/en_US/games/switch/t/the-legend-of-zelda-links-awakening-switch/Switch_TLOZ-LinksAwakening_box.png"
    }
  ];

  const countTitle =
    games.length > 0 ? `${games.length} in collection` : "0 in collection";

  return (
    <React.Fragment>
      <SubNavigation title="Game Collection" />
      <section className="collection">
        <span className="collection__count">{countTitle}</span>
        <ul className="collection__list">
          {games.map(game => (
            <GameList title={game.title} image={game.image} />
          ))}
        </ul>
      </section>
    </React.Fragment>
  );
};

export default Collection;
