import { allMovies } from "./services/tmdb";
import { useEffect, useState } from "react";
import MovieCards from "./components/MovieCards";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setmovies] = useState([]); // [moviesarray, setmoviesarray]

  const Movies = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await allMovies();
      console.log(response); // {page: 1, results: Array(20), total_pages: 1001, total_results: 20001}

      const movies = response.results;
      setmovies(movies);
      console.log(movies);  // {page: 1, results: Array(20), total_pages: 1001, total_results: 20001}
    } catch (error) {
      setError(error);
      console.error(`Error in the Movies Function: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Movies();
  }, []);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <ul>
      {movies.map((movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </ul>
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
