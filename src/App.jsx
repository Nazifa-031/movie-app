import { allMovies } from "./services/tmdb";

import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    allMovies()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(API_KEY);
  }, []);
  return <div>API Test</div>;
};

export default App;
