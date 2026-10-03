import { FaRegHeart, FaHeart } from "react-icons/fa";
import noPoster from "../assets/no-poster.png";

const MovieCard = ({ movie,isFavorite, onToggleFavorite}) => {
  const { title, vote_average, release_date, poster_path, original_language } = movie;

  return (
    <li>
      <img
      
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w185/${poster_path}`
            : noPoster
        }
        alt={`${title} poster`}
      />

      {/* toggle this movie: liked or not liked */}
      <button type="button" onClick={() => onToggleFavorite(movie)}>
        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
      </button>

      <h3>{title}</h3>
      <h4>{release_date}</h4>
      <h4>{vote_average}</h4>
      <h4>{original_language}</h4>
    </li>
  );
};

export default MovieCard;