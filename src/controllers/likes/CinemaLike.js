const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LikeCinema = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { cinemaId } = req.body;

    if (!cinemaId) {
      return res.status(400).json({ message: "cinema ID is required" });
    }

    const cinema = await prisma.cinema.findUnique({
      where: { id: cinemaId },
    });

    if (!cinema) {
      return res.status(404).json({ message: "cinema not found" });
    }

    const existingLike = await prisma.LikeCinema.findUnique({
      where: {
        userId_cinemaId: { userId, cinemaId },
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this cinema" });
    }

    await prisma.LikeCinema.create({
      data: {
        userId,
        cinemaId,
      },
    });

    return res.status(200).json({ message: "cinema liked successfully" });
  } catch (error) {
    console.error("Error liking cinema:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { LikeCinema };
