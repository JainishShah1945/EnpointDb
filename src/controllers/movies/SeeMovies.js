

const knex = require("../../config/knex"); 

const SeeMovies = async (req, res) => {
  try {
    const movies = await knex("movie").select("*");

    if (!movies.length) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json(movies);
  } catch (err) {
    console.error("Error while fetching movies", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { SeeMovies };

