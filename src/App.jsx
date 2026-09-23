import { allMovies, searchapi } from "./services/tmdb";
import { useEffect, useEffectEvent, useState } from "react";
import MovieCards from "./components/MovieCards";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [movies, setmovies] = useState([]); // [moviesarray, setmoviesarray]

  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);

  const [search, setSearch] = useState("");

  const Movies = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = search
        ? await searchapi(search, page)
        : await allMovies(page);
      console.log(response); //if search ? give search string and page to the searchapi endpoint , else : {page: 1, results: Array(20), total_pages: 1001, total_results: 20001}

      const movies = response.results;
      setmovies(movies);
      console.log(movies); // {page: 1, results: Array(20), total_pages: 1001, total_results: 20001}

      const total = response.total_pages;
      setTotalpages(total);
    } catch (error) {
      setError(error);
      console.error(`Error in the Movies Function: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      Movies();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, page]);

  // cleanup: if `search` or `page` changes again,  before 500ms is up, react re starts this useeffect as,
  // Every time search changes, React first runs this cleanup from the previous render (cancelling the old pending timer) before setting up the new one.
  //  — this is the actual debounce mechanism

  return isLoading ? (
    <Loader />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      <Search search={search} setSearch={setSearch} />
      <ul>
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </ul>

      <Pagination page={page} totalpages={totalpages} setPage={setPage} />
    </>
  );
};

export default App;

// response obj
// has result of (20) arrays of objects
//
// adult
// :
// false

// genre_ids
// :
// (3) [878, 28, 12]
// id
// :
// 969681
// original_language
// :
// "en"

// overview
// :
// "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see."
// popularity
// :
// 704.4472
// poster_path
// :
// "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg"
// release_date
// :
// "2026-07-29"

// title
// :
// "Spider-Man: Brand New Day"

// vote_average
// :
// 7.862
