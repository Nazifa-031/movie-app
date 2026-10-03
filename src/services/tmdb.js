
// api algorithm
// api key : read access token from TMDB in .env

// import THE API KEY from the .env
// Access in Vite: import.meta.env.VITE_TMDB_API_KEY
// variable must start with VITE_ or it won't be exposed to your frontend code.

// step 1. Constants —
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Reusable fetch function
// Every endpoint function only needs to provide the endpoint.
// fetch() → Response → response.json() → JS object

const fetchMovies = async (endpoint) => {
  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await response.json();
};

// 2. defining Endpoints, One function per endpoint — pure, no state, no UI

export const allMovies = (page = 1) => {
  const endpoint =
    `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false` +
    `&language=en-US&page=${page}&sort_by=popularity.desc`;

  return fetchMovies(endpoint);
};

// encodeURIComponent() encodes special characters in a search string
// so it can safely go inside a URL.
// Example: encodeURIComponent("Spider Man")

export const searchapi = (searchquery, page = 1) => {
  const endpoint =
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchquery)}` +
    `&include_adult=false&language=en-US&page=${page}`;

  return fetchMovies(endpoint);
};

export const getGenres = () => {
  const endpoint = `${API_BASE_URL}/genre/movie/list?language=en`;

  return fetchMovies(endpoint).then((data) => data.genres);
};

// Why URLSearchParams here instead of a template literal:
// once you have several optional filters, manually building a string
// with & gets messy. URLSearchParams builds the query string for you
// and correctly URL-encodes values automatically.

export const discoverMovies = ({
  page = 1,
  genreId = "",
  minRating = "",
  releaseYear = "",
} = {}) => {
  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    sort_by: "popularity.desc",
    page,
  });

  if (genreId) params.append("with_genres", genreId);
  if (minRating) params.append("vote_average.gte", minRating);
  if (releaseYear) params.append("primary_release_year", releaseYear);

  const endpoint = `${API_BASE_URL}/discover/movie?${params}`;

  return fetchMovies(endpoint);
};

export const trendingMovies = async (timeWindow = "week", page = 1) => {
  const endpoint = `${API_BASE_URL}/trending/movie/${timeWindow}?page=${page}&api_key=${API_KEY}`;
  return fetchMovies(endpoint);
};
