var express = require("express");
var router = express.Router();
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get("/movies", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) =>
      data.results.map(
        ({ title, overview, poster_path, vote_average, vote_count }) => {
          return {
            title,
            overview,
            poster_path: `http://image.tmdb.org/t/p/w342/${poster_path}`,
            vote_average,
            vote_count,
          };
        }
      )
    )
    .then((data) => res.json({ movies: data }))
    .catch((err) => console.error(err));
});

module.exports = router;
