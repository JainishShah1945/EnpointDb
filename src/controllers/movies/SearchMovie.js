const knex = require("../../config/knex");

const SearchMovie = async (req, res) => {
  try {
    const { omdbId } = req.body;

    if (!omdbId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const movie = await knex("movie").where({ omdbId }).first();

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { SearchMovie };
