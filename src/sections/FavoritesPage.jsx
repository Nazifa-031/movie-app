import MovieCard from "../components/MovieCard";

const FavoritesPage = ({ favoriteMovies, onToggleFavorite }) => {
  if (favoriteMovies.length === 0) {
    return <p>No favorites yet. Add a favorite movie.</p>;
   
  }
 // return to the top when  limit is reached to 10 is hit
  return (
    <>
      <h2>Your Favorites</h2>
      <ul>
        {favoriteMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true} // everything on this page is a favorite
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
    </>
  );
};

export default FavoritesPage;