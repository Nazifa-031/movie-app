import { useEffect, useState } from "react";
import { getGenres }  from '../services/tmdb';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

const Filter = ({genreId,minRating,releaseYear,setGenreId,setMinRating,setReleaseYear,}) => {

  const [genres, setGenres] = useState([]); // the LIST of all genres, fetched once

  useEffect(() => {
    getGenres().then((data) => setGenres(data)); // [{ id: 28, name: "Action" }, ...]
  }, []);

  return (
    <>
      <div>
        <label htmlFor="minRating">Min Rating</label>
        <select id="minRating" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
          <option value="">Any Rating</option>
          <option value="5">5+</option>
          <option value="7">7+</option>
          <option value="9">9+</option>
        </select>
      </div>

      <div>
        <label htmlFor="releaseYear">Release Year</label>
        <select id="releaseYear" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)}>
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="genreId">Genre</label>
        <select id="genreId" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
          <option value="">Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
            // genre is an OBJECT { id, name } — destructure the pieces you need
          ))}
        </select>
      </div>
    </>
  );
};

export default Filter;