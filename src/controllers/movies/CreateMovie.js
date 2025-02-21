const knex = require("../../config/knex");

const CreateMovie = async (req, res) => {

  try {
    const { omdbId, title, post } = req.body;
    const userId = req.user.id

    if (
      !omdbId ||
      !title ||
      !post
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingMovie = await knex("movie").where({ omdbId }).first();
    if (existingMovie) {
      return res.status(409).json({ message: "Movie already exists" });
    }

    const newMovie = await knex("movie").insert({
      omdbId,
      title,
      post
    });

    await knex("log").insert({
    userId:userId,
    action: "CREATE",
      entity: "MOVIE",
      entityId: newMovie[0],
      message : "New Cinema Created"
      
})
    return res
      .status(201)
      .json({ message: "Movie added successfully", movieId: newMovie[0] });
  } catch (err) {
    console.error("Error adding movie:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { CreateMovie };
