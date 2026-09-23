// api algorithm
// api key : read access token from TMDB in .env

// import THE API KEY from the .env  , Access in Vite: import.meta.env.VITE_TMDB_API_KEY — variable must start with VITE_ or it won't be exposed to your frontend code.

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

// 2. defining Endpoints, One function per endpoint — pure, no state, no UI

export const allMovies = async (page = 1) => {
  // 1. fetch() gives a Promise, so store it in response using await.
  // 2. The Promise resolves to a Response object.
  // 3. response.json() returns a Promise of the parsed data.
  // 4. If the response fails, throw an error.
  // 5. response.json() reads the Response body and parses it into a real JS object
  // it's async too (reading the stream takes a moment), hence the second await

  const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
    // throwing here stops this function immediately and hands control to
    // whichever try/catch called this function — that's the component, not here
  }

  const data = await response.json();
  return data; // hand the parsed data to whoever called allMovies()
};

// encodeURIComponent() encodes special characters in a search string so it can safely go inside a URL.
// Example: encodeURIComponent("Spider Man")

export const searchapi = async (searchquery, page = 1) => {
  const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchquery)}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();
  return data;
};
  
