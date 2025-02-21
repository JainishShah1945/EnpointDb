const knex = require("../../config/knex"); 

const UpdateMovie = async (req, res) => {
  try {
    const { id, title,post } = req.body;
  const userId = req.user.id
    if (!id) {
      return res.status(400).json({ message: "id is required for updating a movie" });
    }

    const existingMovie = await knex("movie").where({ id }).first();
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (post) updateData.post = post;

    const updateMovie = await knex("movie").where({ id }).update(updateData);
    await knex("log").insert({
    userId:userId,
    action: "PUT",
      entity: "MOVIE",
      entityId:  id,
      message : "MOVIE GOT UPDATED"
      
})

    return res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {
    console.error("Error updating movie", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { UpdateMovie };
