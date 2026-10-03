// import {topMovie} from main.jsx 
// we know that {topMovie} is one the [topthree] or {topMovie} is the child of maped array
import noPoster from "../assets/no-poster.png";

const TopThree = ({topMovie} ) => {
  const { title, vote_average, release_date, poster_path, original_language } = topMovie;
  return (
    <div>
      <p>TopMovies</p>
      <ul>
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
          </ul>
    </div>

  )
}

export default TopThree