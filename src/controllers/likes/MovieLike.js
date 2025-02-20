const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LikeMovie = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_movieId: { userId, movieId },
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this movie" });
    }

    await prisma.like.create({
      data: {
        userId,
        movieId,
      },
    });

    return res.status(200).json({ message: "Movie liked successfully" });
  } catch (error) {
    console.error("Error liking movie:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { LikeMovie };
