import React, { useState } from "react";

const GameGallery = ({ gallery, title, id }) => {
  const [activeImage, setActiveImage] = useState(gallery[0]);

  const selectImage = image => {
    setActiveImage(image);
  };

  return (
    <div className="game-display__gallery">
      <div className="game-display__gallery-display">
        {gallery.map((image, index) => (
          <img
            key={image}
            className={
              image === activeImage
                ? "game-display__gallery-display-img game-display__gallery-display-img--active"
                : "game-display__gallery-display-img"
            }
            src={image}
            alt={`${title}-${index}`}
          />
        ))}
      </div>

      <div className="game-display__gallery-select">
        {gallery.map((image, index) => (
          <div
            key={image}
            onClick={() => selectImage(image)}
            className={
              image === activeImage
                ? "game-display__gallery-box game-display__gallery-box--active"
                : "game-display__gallery-box"
            }
          >
            <img src={image} alt={`${title}-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGallery;
