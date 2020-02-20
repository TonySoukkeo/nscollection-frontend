import React, { useEffect, useState } from "react";

// Components
import BrowseGameDisplay from "../../components/browse/BrowseGameDisplay";
import Loading from "../../components/loading/Loading";
import BrowseFilterButton from "../../components/browse/BrowseFilterButton";
import BrowseFilterDisplay from "../../components/browse/BrowseFilterDisplay";
import Overlay from "../../util/Overlay";

// Custom hooks
import usePath from "../../hooks/usePath";
import useError from "../../hooks/useError";
import useIsLoading from "../../hooks/useIsLoading";

const Browse = () => {
  const [results, setResults] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 60
  });
  const [toggleFilter, setToggleFilter] = useState(false);

  const { errorMessage, setError } = useError();
  const { loading, setLoading } = useIsLoading();

  useEffect(() => {
    // Filter values based of query string from url
    const params = new URLSearchParams(window.location.search);

    const demo = params.get("demo");
    const sale = params.get("sales");
    const newRelease = params.get("new-release");
    const comingSoon = params.get("coming-soon");
    const dlc = params.get("dlc");
    const cloudSave = params.get("cloud-save");
    const onlinePlay = params.get("online-play");

    // Make api call to get games based on filters
    const getGames = async () => {
      setLoading(true);
      try {
        const results = await fetch(
          `${process.env.REACT_APP_BASE_URL}/games/all`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              demo,
              sale,
              newRelease,
              dlc,
              cloudSave,
              onlinePlay,
              priceRange,
              comingSoon
            })
          }
        );

        const data = await results.json();

        // Check for any errors
        if (data.status !== 200) {
          const error = new Error();
          error.message = data.message;

          throw error;
        }

        setResults(data.games);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError({
          errorMessage: err.message
        });
      }
    };

    getGames();
  }, []);

  // Set path name for bottom navigation active items
  usePath();

  // Toggle filter function
  const showFilter = () => {
    setToggleFilter(prevState => !prevState);
  };

  return (
    <React.Fragment>
      {!loading ? (
        <BrowseFilterButton
          hideButton={toggleFilter}
          toggleFilter={showFilter}
        />
      ) : null}

      <BrowseFilterDisplay
        closeDisplay={() => setToggleFilter(prevState => !prevState)}
        visible={toggleFilter}
      />

      {/* <BrowseFilterDisplay /> */}
      <section className="browse">
        <Overlay visible={toggleFilter} />
        {errorMessage ? (
          <div className="alert alert--error mb-sm">{errorMessage}</div>
        ) : null}

        {loading ? (
          <Loading
            styles={{
              width: "10%",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "8rem"
            }}
          />
        ) : (
          <ul className="browse__list">
            {results.map(result => (
              <BrowseGameDisplay key={result.id} game={result} />
            ))}
          </ul>
        )}
      </section>
    </React.Fragment>
  );
};

export default Browse;
