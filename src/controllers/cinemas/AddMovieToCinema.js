const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addMovieToCinema = async (req, res) => {
  try {
    const { cinemaId, movieId } = req.body; 

    if (!cinemaId || !movieId) {
      return res.status(400).json({ message: "cinemaId and movieId are required" });
    }

    const cinema = await prisma.cinema.findUnique({ where: { id: cinemaId } });
    const movie = await prisma.movie.findUnique({ where: { id: movieId } });

    if (!cinema || !movie) {
      return res.status(404).json({ message: "Cinema or Movie not found" });
    }

    await prisma.cinemaMovie.upsert({
      where: {
        cinemaId_movieId: { cinemaId, movieId }, 
      },
      update: {}, 
      create: {
        cinemaId,
        movieId,
      },
    });

    res.status(200).json({ message: "Movie added to cinema successfully" });
  } catch (error) {
    console.error("Error adding movie to cinema:", error);
    res.status(500).json({ message: "Error adding movie to cinema", error: error.message });
  }
};

module.exports = { addMovieToCinema };
