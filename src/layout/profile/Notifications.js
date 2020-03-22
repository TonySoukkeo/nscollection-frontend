import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import { Route, Redirect } from "react-router-dom";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import NotificationsList from "../../components/profile/NotificationsList";
import Loading from "../../components/loading/Loading";

// Custom hooks
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

// Context
import { StateContext, DispatchContext } from "../../context/StateProvider";

// Actions
import { setUser } from "../../reducers/actions/AuthActions";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const { isAuth, token } = useContext(StateContext);

  const { setError, errorMessage } = useError();
  const { loading, setLoading, loadingType, setLoadingType } = useIsLoading();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setLoading(true);
        setLoadingType("main");
        setError({ errorMessage: "" });
        const token = localStorage.getItem("token");

        const notifications = await fetch(
          `${
            process.env.REACT_APP_BASE_URL
          }/user/all-notifications?page=${1}&limit=${5}`,
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
        setLoadMore(notificationsData.loadMore);
        setLoading(false);
        setLoadingType("");
      } catch (err) {
        setLoadingType("");
        setLoading(false);
        setError({ errorMessage: err.message });
      }
    };

    getNotifications();
  }, []);

  // Observer and ref for infinite loading
  const observer = useRef();
  const lastElement = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && loadMore) {
          // Add to page number
          setPage(prevPage => prevPage + 1);

          // Get next set of notifications from api
          const loadNotifications = async () => {
            try {
              setLoading(true);
              setLoadingType("load more");

              const token = localStorage.getItem("token");

              const results = await fetch(
                `${
                  process.env.REACT_APP_BASE_URL
                }/user/all-notifications?page=${page + 1}&limit=${5}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );

              const resultsData = await results.json();

              // Check for any errors;
              if (resultsData.status !== 200) {
                const error = new Error();
                error.message = resultsData.message;
                throw error;
              }

              setNotifications(prevState => [
                ...prevState,
                ...resultsData.messages
              ]);

              setLoadMore(resultsData.loadMore);
              setLoadingType("");
              setLoading(false);
            } catch (err) {
              setLoading(false);
              setLoadingType("");
              setError({ errorMessage: err.message });
            }
          };

          loadNotifications();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  // Delete notification
  const deleteNotification = async id => {
    try {
      setLoading(true);
      setLoadingType("delete");

      const removeMessage = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/notifications`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ gameId: id })
        }
      );

      const removeMessageData = await removeMessage.json();

      // Check for any errors
      if (removeMessageData.status !== 201) {
        const error = new Error();
        error.message = removeMessageData.message;
        throw error;
      }

      setLoading(false);
      setLoadingType("");
      setNotifications(prevState =>
        prevState.filter(item => item.gameId._id !== id)
      );
    } catch (err) {
      setLoading(false);
      setLoadingType("");
      setError({ errorMessage: err.message });
    }
  };

  // Clear all notifications
  const clearNotifications = async () => {
    try {
      setLoading(true);
      setLoadingType("clear all");

      const clear = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/clear`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const clearData = await clear.json();

      // Check for any errors
      if (clearData.status !== 200) {
        const error = new Error();
        error.message = clearData.message;

        throw error;
      }

      setNotifications([]);
      setLoading(false);
      setLoadingType("");
    } catch (err) {
      setLoadingType("");
      setLoading(false);
      setError({ errorMessage: err.message });
    }
  };

  return (
    <Route
      render={() =>
        isAuth ? (
          <React.Fragment>
            <SubNavigation title="Notifications" />
            <section className="profile-notifications container">
              <span
                onClick={clearNotifications}
                className="profile-notifications__clear"
              >
                Clear all messages
              </span>

              {errorMessage ? (
                <div className="alert alert--error">{errorMessage}</div>
              ) : null}

              {loading && loadingType === "main" ? (
                <Loading styles={{ width: "3rem", margin: "0 auto" }} />
              ) : notifications.length > 0 ? (
                <ul className="profile-notifications__list">
                  {notifications.map((message, index) => {
                    if (notifications.length === index + 1) {
                      return (
                        <NotificationsList
                          ref={lastElement}
                          key={message._id}
                          gameId={message.gameId._id}
                          image={message.gameId.image}
                          gameTitle={message.gameId.title}
                          price={message.gameId.price}
                          salePrice={message.gameId.salePrice}
                          message={message.message}
                          deleteNotification={deleteNotification}
                        />
                      );
                    } else
                      return (
                        <NotificationsList
                          key={message._id}
                          gameId={message.gameId._id}
                          image={message.gameId.image}
                          gameTitle={message.gameId.title}
                          price={message.gameId.price}
                          salePrice={message.gameId.salePrice}
                          message={message.message}
                          deleteNotification={deleteNotification}
                        />
                      );
                  })}

                  {loading && loadingType === "load more" ? (
                    <Loading
                      styles={{
                        width: "3rem",
                        margin: "0 auto",
                        gridColumn: "1/-1"
                      }}
                    />
                  ) : null}
                </ul>
              ) : (
                <p>No notifications to display.</p>
              )}
            </section>
            ;
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Notifications;
