const knex = require("../../config/knex"); 

const UpdateMovie = async (req, res) => {
  try {
    const { omdbId, title,post } = req.body;

    if (!omdbId) {
      return res.status(400).json({ message: "omdbId is required for updating a movie" });
    }

    const existingMovie = await knex("movie").where({ omdbId }).first();
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (post) updateData.post = post;

    await knex("movie").where({ omdbId }).update(updateData);

    return res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {
    console.error("Error updating movie", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { UpdateMovie };
