import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";

// Custom hooks
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

// Context
import { StateContext } from "../../context/StateProvider";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { isAuth } = useContext(StateContext);

  const { error, setError } = useError();
  const { loading, setLoading } = useIsLoading();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setLoading(true);
        setError({ errorMessage: "" });
        const token = localStorage.getItem("token");

        const notifications = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/all-notifications?page=${1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const notificationsData = await notifications.json();

        // Check for any errors
        if (notificationsData.status !== 200) {
          const error = new Error();
          error.message = notificationsData.message;

          throw error;
        }

        setNotifications(notificationsData.messages);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError({ errorMessage: err.message });
      }
    };

    getNotifications();
  }, []);

  return (
    <React.Fragment>
      <SubNavigation title="Notifications" />
      <section className="profile-notifications container">
        {notifications.length > 0 ? (
          <ul className="profile-notifications__list">
            {notifications.map(message => (
              <Link
                key={message._id}
                to={`/game?gameId=${message.gameId._id}`}
                className="profile-notifications__item"
              >
                <div className="profile-notifications__item-image">
                  <img src={message.gameId.image} alt={message.gameId.title} />
                </div>

                <div className="profile-notifications__item-details">
                  <h3>{message.message}</h3>
                  <p>${message.gameId.price}</p>
                  <p>${message.gameId.salePrice}</p>
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No notifications to display.</p>
        )}
      </section>
      ;
    </React.Fragment>
  );
};

export default Notifications;
