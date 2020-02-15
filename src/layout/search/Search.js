import React, { useState, useEffect } from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";
import SearchBar from "../../components/search/SearchBar";
import SearchDisplay from "../../components/search/SearchDisplay";
import Loading from "../../components/loading/Loading";

// Custom hooks
import usePath from "../../hooks/usePath";
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

const Search = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const { loading, setLoading } = useIsLoading();

  const { errorMessage, setError } = useError();

  // Set path name for bottom navigation active items
  usePath();

  useEffect(() => {
    try {
      setLoading(true);
      const search = async () => {
        const gameResults = await fetch("http://localhost:3000/games/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ gameTitle: title })
        });

        const data = await gameResults.json();

        if (data.status !== 200) {
          const error = new Error();
          error.message = data.message;
          throw error;
        }
        setLoading(false);
        setResults(data.results);
      };

      search();
    } catch (err) {
      setLoading(false);
      setError({ errorMessage: err.message });
    }
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
                title={result.title}
                image={result.image}
                players={result.players}
                releaseDate={result.releaseDate}
                own={result.own}
                price={result.price}
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
