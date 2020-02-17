import React, { useState, useEffect, useContext } from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import SearchBar from "../../components/search/SearchBar";
import SearchDisplay from "../../components/search/SearchDisplay";
import Loading from "../../components/loading/Loading";

// Custom hooks
import usePath from "../../hooks/usePath";
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";
import useUser from "../../hooks/useUser";

// Context
import { StateContext } from "../../context/StateProvider";

const Search = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const { loading, setLoading } = useIsLoading();

  const { user } = useContext(StateContext);

  const { checkUserLibrary } = useUser();

  const { errorMessage, setError } = useError();

  // Set path name for bottom navigation active items
  usePath();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const search = async () => {
      try {
        if (title !== "") {
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

          const data = await gameResults.json();

          if (data.status !== 200) {
            const error = new Error();
            error.message = data.message;
            throw error;
          }

          setResults(data.results);
          setLoading(false);
        }
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        else {
          setError({ errorMessage: err.message });
          setLoading(false);
        }
      }
    };

    search();
    return () => {
      controller.abort();
      setResults([]);
    };
  }, [title]);

  const gameSearch = e => {
    setTitle(e.target.value);
  };

  return (
    <React.Fragment>
      <SubNavigation title="Search" />
      <section className="search">
        {errorMessage ? (
          <div className="alert alert--error mb-md">{errorMessage}</div>
        ) : null}

        <SearchBar onChange={gameSearch} />

        {!loading ? (
          <ul className="search__list">
            {results.map(result => (
              <SearchDisplay
                key={result.id}
                id={result.id}
                checkUserLibrary={checkUserLibrary}
                title={result.title}
                image={result.image}
                players={result.players}
                releaseDate={result.releaseDate}
                ownedBy={result.own}
                price={result.price}
                userId={user._id}
                salePrice={result.salePrice || null}
              />
            ))}
          </ul>
        ) : (
          <Loading
            styles={{
              position: "absolute",
              width: "10%",
              top: "60%",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          />
        )}
      </section>
    </React.Fragment>
  );
};

export default Search;
