import React, { useEffect, useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";

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
import useWindow from "../../hooks/useWindow";

const Browse = ({ location }) => {
  const [results, setResults] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: null,
    max: null
  });
  const [toggleFilter, setToggleFilter] = useState(false);
  const [totalGames, setTotalGames] = useState(0);

  const [width] = useWindow();

  const [filter, setFilter] = useState({
    all: false,
    demo: false,
    newRelease: false,
    comingSoon: false,
    sale: false,
    dlc: false,
    cloudSave: false,
    onlinePlay: false
  });

  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const { errorMessage, setError } = useError();
  const { loading, setLoading, loadingType, setLoadingType } = useIsLoading();

  useEffect(() => {
    let all, demo, sale, newRelease, comingSoon, dlc, cloudSave, onlinePlay;

    if (page === 1) {
      all = location.state.all;
      demo = location.state.demo;
      sale = location.state.sale;
      newRelease = location.state.newRelease;
      comingSoon = location.state.comingSoon;
      dlc = location.state.dlc;
      cloudSave = location.state.cloudSave;
      onlinePlay = location.state.onlinePlay;

      setFilter({
        all: all || false,
        demo: demo || false,
        newRelease: newRelease || false,
        comingSoon: comingSoon || false,
        dlc: dlc || false,
        cloudSave: cloudSave || false,
        onlinePlay: onlinePlay || false,
        sale: sale || false
      });
    } else {
      all = filter.all;
      demo = filter.demo;
      sale = filter.sale;
      newRelease = filter.newRelease;
      comingSoon = filter.comingSoon;
      dlc = filter.dlc;
      cloudSave = filter.cloudSave;
      onlinePlay = filter.onlinePlay;
      sale = filter.sale;
    }

    // Make api call to get games based on filters
    const getGames = async () => {
      setLoading(true);
      setLoadingType("initial");
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
              comingSoon,
              page
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

        setLoadMore(data.loadMore);
        setResults(prevResult => [...prevResult, ...data.games]);
        setTotalGames(data.total);
        setLoading(false);
        setLoadingType("");
      } catch (err) {
        setLoading(false);
        setLoadingType("");
        setError({
          errorMessage: err.message
        });
      }
    };

    getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set path name for bottom navigation active items
  usePath();

  // Toggle filter function
  const showFilter = () => {
    setToggleFilter(prevState => !prevState);
  };

  // onChange to toggle filter
  const changeFilter = e => {
    e.persist();

    // Toggle 7off 'all' filter if target name is not 'all'
    if (e.target.name !== "all") {
      setFilter(prevState => ({
        ...prevState,
        all: false
      }));
    }

    // Toggle of all other filters if target name is 'all'
    if (e.target.name === "all") {
      setFilter(prevState => ({
        ...prevState,
        demo: false,
        newRelease: false,
        comingSoon: false,
        sale: false,
        dlc: false,
        cloudSave: false,
        onlinePlay: false
      }));
    }

    setFilter(prevState => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name]
    }));

    // Restrict search so users can't filter out new release + coming soon
    if (e.target.name === "newRelease") {
      setFilter(prevState => ({
        ...prevState,
        comingSoon: false
      }));
    }

    if (e.target.name === "comingSoon") {
      setFilter(prevState => ({
        ...prevState,
        newRelease: false
      }));
    }
  };

  // onChange to set priceRange
  const changePriceRange = value => {
    setPriceRange(value);
  };

  // Update search filters
  const updateFilter = async () => {
    // Make call to api
    try {
      setToggleFilter(false);
      setLoading(true);
      setLoadingType("initial");

      const {
        demo,
        sale,
        newRelease,
        dlc,
        cloudSave,
        onlinePlay,
        comingSoon
      } = filter;

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

      setTotalGames(data.total);
      setResults(data.games);
      setLoadMore(data.loadMore);
      setPage(1);
      setLoading(false);
      setLoadingType("");
    } catch (err) {
      setLoading(false);
      setLoadingType("");
      setError({
        errorMessage: err.message
      });
    }
  };

  // Observer and ref for infinite loading
  const observer = useRef();
  const lastGameElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && loadMore) {
          // Add to page number
          setPage(prevPage => prevPage + 1);

          // Get next set of games from api
          const loadGame = async () => {
            try {
              setLoading(true);
              setLoadingType("load more");

              const results = await fetch(
                `${process.env.REACT_APP_BASE_URL}/games/all`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    demo: filter.demo,
                    sale: filter.sale,
                    newRelease: filter.newRelease,
                    dlc: filter.dlc,
                    cloudSave: filter.cloudSave,
                    onlinePlay: filter.onlinePlay,
                    priceRange,
                    comingSoon: filter.comingSoon,
                    page: page + 1
                  })
                }
              );

              const data = await results.json();

              // Check for errors
              if (data.status !== 200) {
                const error = new Error();
                error.message = data.message;

                throw error;
              }

              setResults(prevResult => [...prevResult, ...data.games]);
              setLoadMore(data.loadMore);
              setLoadingType("");
              setLoading(false);
            } catch (err) {
              setLoading(false);
              setLoadingType("");
              setError({
                errorMessage: err.message
              });
            }
          };

          loadGame();
        }
      });

      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, loadMore]
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>NS Collection | Browse</title>
        <meta name="description" content="Browse all nintendo switch games from NA. Filter out by price, dlc, demos, and more."/>
        </Helmet>
      {loadingType !== "initial" ? (
        <BrowseFilterButton
          hideButton={toggleFilter}
          toggleFilter={showFilter}
          totalGames={totalGames}
        />
      ) : null}

      <BrowseFilterDisplay
        closeDisplay={() => setToggleFilter(prevState => !prevState)}
        visible={toggleFilter}
        filter={filter}
        updateFilter={updateFilter}
        changeFilter={changeFilter}
        changePriceRange={changePriceRange}
      />

      <Overlay onClick={() => setToggleFilter(false)} visible={toggleFilter} />

      <section className="browse">
        {errorMessage ? (
          <div className="alert alert--error mb-sm">{errorMessage}</div>
        ) : null}

        {loading && loadingType === "initial" ? (
          <Loading
            styles={{
              width: "4rem",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "8rem"
            }}
          />
        ) : (
          <ul className="browse__list">
            {results.map((result, index) => {
              if (results.length === index + 1) {
                return (
                  <BrowseGameDisplay
                    ref={lastGameElementRef}
                    key={result.id}
                    game={result}
                  />
                );
              } else {
                return <BrowseGameDisplay key={result.id} game={result} />;
              }
            })}

            {loading && loadingType === "load more" ? (
              <Loading
                styles={
                  width < 960
                    ? { width: "4rem", marginBottom: "1rem" }
                    : {
                        width: "4rem",
                        position: "absolute",
                        left: "50%",
                        bottom: "-7rem",
                        marginBottom: "2rem"
                      }
                }
              />
            ) : null}
          </ul>
        )}
      </section>
    </React.Fragment>
  );
};

export default Browse;
