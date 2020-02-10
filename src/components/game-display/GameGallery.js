import React, { useState, useEffect } from "react";

const GameGallery = () => {
  const images = [
    "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/screenshot-gallery/Switch_SuperMarioOdyssey_01.jpg",
    "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/screenshot-gallery/Switch_SuperMarioOdyssey_02.jpg",
    "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/screenshot-gallery/Switch_SuperMarioOdyssey_03.jpg",
    "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/screenshot-gallery/Switch_SuperMarioOdyssey_04.jpg",
    "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/screenshot-gallery/Switch_SuperMarioOdyssey_05.jpg",
    "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-odyssey-switch/screenshot-gallery/Switch_SuperMarioOdyssey_06.jpg"
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  const selectImage = image => {
    setActiveImage(image);
  };

  return (
    <div className="game-display__gallery">
      <div className="game-display__gallery-display">
        {images.map(image => (
          <img
            className={
              image === activeImage
                ? "game-display__gallery-display-img game-display__gallery-display-img--active"
                : "game-display__gallery-display-img"
            }
            src={image}
            alt="Stuff"
          />
        ))}
      </div>

      <div className="game-display__gallery-select">
        {images.map(image => (
          <div
            key={image}
            onClick={() => selectImage(image)}
            className={
              image === activeImage
                ? "game-display__gallery-box game-display__gallery-box--active"
                : "game-display__gallery-box"
            }
          >
            <img src={image} alt="Mario Odyseey" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGallery;
