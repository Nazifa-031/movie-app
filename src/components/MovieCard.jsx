import noPoster from "../assets/no-poster.png";

const MovieCard = ({ movie }) => {
  const { title, vote_average, release_date, poster_path, original_language } =
    movie;

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

      <h3>{title}</h3>
      <h4>{release_date}</h4>
      <h4>{vote_average}</h4>
      <h4>{original_language}</h4>
    </li>
  );
};

export default MovieCard;