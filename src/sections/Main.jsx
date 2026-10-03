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
import FavoritesPage from "./FavoritesPage";

const MAX_FAVORITES = 10;

const Main = () => {
  // all movies
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // trending
  const [trending, setTrending] = useState([]);
  const [topThree, setTopThree] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState("");
  // pagination
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  // search
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");
  const [minRating, setMinRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  // favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [limitMessage, setLimitMessage] = useState("");

  // ---------- Favorite ----------
  // helper: is this movie id in the favorites array? -> true / false
  const isFavorite = (movieId) =>
    favoriteMovies.some((fav) => fav.id === movieId);

  const onToggleFavorite = (movie) => {
    // 1. already liked -> remove
    if (isFavorite(movie.id)) {
      setFavoriteMovies(favoriteMovies.filter((fav) => fav.id !== movie.id));
      setLimitMessage("");
      return;
    }

    // 2. not liked, list is full -> block
    if (favoriteMovies.length >= MAX_FAVORITES) {
      setLimitMessage(
        `Limit reached: you can save up to ${MAX_FAVORITES} favorites. Remove one to add another.`
      );
      return;
    }

    // 3. not liked, there is room -> add
    setFavoriteMovies([...favoriteMovies, movie]);
    setLimitMessage("");
  };

  // ---------- Fetching ----------
  const loadTrending = async () => {
    try {
      const response = await trendingMovies("week", 1);
      setTopThree(response.results.slice(0, 3));
      setTrending(response.results.slice(0, 10));
    } catch (err) {
      console.error(`Error in loadTrending: ${err}`);
      setTrendingError(err.message || "Something went wrong");
    } finally {
      setTrendingLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
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
    const timeoutId = setTimeout(loadMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [search, page, genreId, minRating, releaseYear]);

  // ---------- Debug ----------
  useEffect(() => {
    console.group("DEBUG");
    console.log("trending (10):", trending);
    console.log("topThree (3):", topThree);
    console.log("movies:", movies);
    console.log("favoriteMovies:", favoriteMovies);
    console.log("limitMessage:", limitMessage);
    console.groupEnd();
  }, [trending, topThree, movies, favoriteMovies, limitMessage]);

  // ---------- UI ----------
  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={
          <>
            {limitMessage && <p role="alert">{limitMessage}</p>}

            {trendingLoading ? (
              <Loader />
            ) : trendingError ? (
              <p>{trendingError}</p>
            ) : (
              <>
                <p>Top Three Movies</p>
                <ul>
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
                <p>Trending Movies</p>
                <ul>
                  {trending.map((trdMovie) => (
                    <MovieCard
                      key={trdMovie.id}
                      movie={trdMovie}
                      isFavorite={isFavorite(trdMovie.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
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
                <p>All Movies</p>
                <ul>
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isFavorite={isFavorite(movie.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
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

      {/* FAVORITES PAGE */}
      <Route
        path="/favorites"
        element={
          <FavoritesPage
            favoriteMovies={favoriteMovies}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite()}
          />
        }
      />
    </Routes>
  );
};

export default Main;