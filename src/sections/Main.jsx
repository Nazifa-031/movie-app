import {
  allMovies,
  searchapi,
  discoverMovies,
  trendingMovies,
} from "../services/tmdb";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Filter from "../components/Filter";
import TopThree from "./TopThree";

const Main = () => {
  // all movies
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // trending
  const [trending, setTrending] = useState([]);
  const [topThree, setTopThree] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true); // true so there's no empty flash on first render
  const [trendingError, setTrendingError] = useState("");
  // pagination
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  // search
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");
  const [minRating, setMinRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  // // favorite movies
  // const [favoriteMovies, setfavoriteMovies] = useState([]);
  // const [limitMessage, setlimitMessage] = useState("");

  // // ---------- Favorite ----------

  // const isLiked = favoriteMovies.map((movie) => )

  // const toggleLike = (params) => {

  // };

  // ---------- Fetching ----------
  const loadTrending = async () => {
    try {
      const response = await trendingMovies("week", 1);
      setTopThree(response.results.slice(0, 3));
      setTrending(response.results.slice(0, 10));
    } catch (err) {
      console.error(`Error in loadTrending: ${err}`);
      setTrendingError(err.message || "something went wrong");
    } finally {
      setTrendingLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
    console.log("trending", topThree, trending);
  }, []);

  const loadMovies = async () => {
    setIsLoading(true);
    setError("");
    try {
      const hasFilters = genreId || minRating || releaseYear;

      const response = hasFilters
        ? await discoverMovies({ page, genreId, minRating, releaseYear })
        : search
          ? await searchapi(search, page)
          : await allMovies(page);

      setMovies(response.results);
      setTotalpages(response.total_pages);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error(`Error in loadMovies: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("movies", movies);
    const timeoutId = setTimeout(loadMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [search, page, genreId, minRating, releaseYear]);

  useEffect(() => {
    console.group("DEBUG");

    console.log("trending (10):", trending);
    console.log("topThree (3):", topThree);
    console.log("one item = topThree[0]:", topThree[0]);
    console.log("topThree is array?", Array.isArray(topThree));
    console.log(
      "trendingLoading:",
      trendingLoading,
      "| trendingError:",
      trendingError,
    );

    console.log("movies:", movies);
    console.log("isLoading:", isLoading, "| error:", error);

    console.groupEnd();
  }, [
    trending,
    topThree,
    trendingLoading,
    trendingError,
    movies,
    isLoading,
    error,
  ]);
  // ---------- UI ----------
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* <p>{limitMessage}</p> */}
            {trendingLoading ? (
              <Loader />
            ) : trendingError ? (
              <p>{trendingError}</p>
            ) : (
              <>
                <ul>
                  <p>Top Three Movies </p>
                  {topThree.map((topMovie) => (
                    <TopThree key={topMovie.id} topMovie={topMovie} />
                  ))}
                </ul>
              </>
            )}

            <Search search={search} setSearch={setSearch} />
            <Filter
              genreId={genreId}
              setGenreId={setGenreId}
              minRating={minRating}
              setMinRating={setMinRating}
              releaseYear={releaseYear}
              setReleaseYear={setReleaseYear}
            />

            {trendingLoading ? (
              <Loader />
            ) : trendingError ? (
              <p>{trendingError}</p>
            ) : (
              <>
                <ul>
                  <p>Trending Movies </p>
                  {trending.map((trdMovie) => (
                    <MovieCard key={trdMovie.id} movie={trdMovie} />
                  ))}
                </ul>
              </>
            )}

            {isLoading ? (
              <Loader />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <ul>
                  <p>all Movies </p>
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>

                <Pagination
                  page={page}
                  totalpages={totalpages}
                  setPage={setPage}
                />
              </>
            )}
          </>
        }
      />
    </Routes>
  );
};

export default Main;
