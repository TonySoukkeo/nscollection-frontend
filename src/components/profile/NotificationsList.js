import React from "react";
import { Link } from "react-router-dom";

const NotificationsList = React.forwardRef(
  (
    { gameId, image, gameTitle, price, salePrice, message, deleteNotification },
    ref
  ) => {
    return (
      <li ref={ref} className="profile-notifications__item">
        <div className="profile-notifications__item-image">
          <Link to={`/game?gameId=${gameId}`}>
            <img src={image} alt={gameTitle} />
          </Link>
        </div>

        <div className="profile-notifications__item-details">
          <Link to={`/game?gameId=${gameId}`}>
            <h3>{message}</h3>
            <div className="d-flex">
              <p className="strike">${price}</p>
              <p className="sale-price">${salePrice}</p>
            </div>
          </Link>
        </div>
        <button onClick={() => deleteNotification(gameId)} className="btn">
          Delete
        </button>
      </li>
    );
  }
);

export default NotificationsList;
