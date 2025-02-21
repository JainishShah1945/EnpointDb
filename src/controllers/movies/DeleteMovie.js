const knex = require("../../config/knex"); 

const DeleteMovie = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const existingMovie = await knex("movie").where({ id }).first();

    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await knex("movie").where({ id }).del();
    
    await knex("log").insert({
    userId:userId,
    action: "DELETE",
      entity: "MOVIE",
      entityId: id,
      message : "Movie Got Deleted"
      
})

    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { DeleteMovie };
