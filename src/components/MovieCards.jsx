import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import noPoster from "../assets/no-poster.png";

const MovieCards = ({
  movie: {
    title,
    id,
    vote_average,
    release_date,
    poster_path,
    original_language,
  },
}) => {
  return (
    <div>
      <li>
        <img
          src={
            poster_path
              ? `http://image.tmdb.org/t/p/w185/${poster_path}`
              : `${noPoster}`
          }
          alt="poster"
        />
        <FontAwesomeIcon icon={faEllipsisVertical} />
        <h3>{title}</h3>
        <h4>{release_date}</h4>
        <h4>{vote_average}</h4>
        <h4>{original_language}</h4>
      </li>
    </div>
  );
};

export default MovieCards;
