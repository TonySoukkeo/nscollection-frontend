import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/images/nscollection_logo.png";
import { Link } from "react-router-dom";

// Components
import SearchDisplay from "../../components/search/SearchDisplay";
import Loading from "../../components/loading/Loading";

// Actions
import { setNotificationCount } from "../../reducers/actions/AuthActions";

// Context
import { StateContext, DispatchContext } from "../../context/StateProvider";

// Custom hooks
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";
import useUser from "../../hooks/useUser";

const Navigation = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const { user, notificationCount, isAuth } = useContext(StateContext);
  const { checkUserLibrary } = useUser();

  const { loading, setLoading } = useIsLoading();
  const { setError } = useError();

  const { authDispatch } = useContext(DispatchContext);

  useEffect(() => {
    const search = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);

        const gameResults = await fetch(
          `${process.env.REACT_APP_BASE_URL}/games/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ gameTitle: title }),
            signal
          }
        );

        const gameResultsData = await gameResults.json();

        if (gameResultsData.status !== 200) {
          const error = new Error();
          error.message = gameResultsData.message;

          throw error;
        }

        setResults(gameResultsData.results);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError({ errorMessage: err.message });
      }
    };

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  // Onchange for search title
  const searchOnChange = e => {
    const value = e.target.value;

    setTitle(value);
  };

  // Clear search results
  const clearResults = () => {
    setResults([]);
    setTitle("");
  };

  return (
    <nav className="main-nav container">
      <Link to="/">
        <img className="logo" src={Logo} alt="NSCollection logo" />
      </Link>

      <div className="main-nav__search">
        <input
          value={title}
          onChange={searchOnChange}
          type="text"
          placeholder="Search for game"
        />
      </div>

      {results.length !== 0 ? (
        <ul className="main-nav__search-results">
          {loading ? (
            <Loading
              styles={{ width: "3rem", position: "absolute", left: "50%" }}
            />
          ) : (
            <React.Fragment>
              <span onClick={clearResults} className="main-nav__search-close">
                Clear Results <i className="fas fa-times"></i>
              </span>
              {results.map(result => (
                <SearchDisplay
                  key={result.id}
                  id={result.id}
                  checkUserLibrary={checkUserLibrary}
                  userId={user._id}
                  title={result.title}
                  image={result.image}
                  players={result.players}
                  releaseDate={result.releaseDate}
                  ownedBy={result.own}
                  price={result.price}
                  salePrice={result.salePrice || null}
                  clearResults={clearResults}
                />
              ))}
            </React.Fragment>
          )}
        </ul>
      ) : null}

      <ul className="main-nav__list">
        <Link className="main-nav__item" to="/">
          Home
        </Link>

        <Link
          className="main-nav__item"
          to={{
            pathname: "/browse",
            state: { all: true }
          }}
        >
          Games
        </Link>

        <Link className="main-nav__item" to="/about">
          About
        </Link>
      </ul>

      <ul className="main-nav__user-list">
        <Link
          className="main-nav__user-list__item tool-tip"
          to="/collection?view=collection"
        >
          <i className="fas fa-box"></i>

          <span className="tool-tip--box">My collection</span>
        </Link>

        {isAuth ? (
          <Link
            onClick={() => setNotificationCount(0, authDispatch)}
            className="main-nav__user-list__item tool-tip"
            to="/profile/notifications"
          >
            <i className="fas fa-envelope"></i>

            <span className="tool-tip--box">Notifications</span>

            <span
              className={
                notificationCount > 0
                  ? "notifications notifications--desktop-active"
                  : "notifications"
              }
            >
              {notificationCount}
            </span>
          </Link>
        ) : null}

        <Link className="main-nav__user-list__item tool-tip" to="/profile">
          <i className="fas fa-user"></i>
          <span className="tool-tip--box">My Profile</span>
        </Link>
      </ul>
      <Link to="/about" className="main-nav--about-icon">
        ?
      </Link>
    </nav>
  );
};

export default Navigation;
