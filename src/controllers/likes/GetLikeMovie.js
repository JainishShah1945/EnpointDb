const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetLikeMovies = async (req,res) => {
  try {
    const userId = req.user.id;

    const likedMovies = await prisma.like.findMany({
      where: { userId },
    });

    if (!likedMovies.length) {
     
    return res.status(500).json({ message: "User had not liked any movie till yet" });
  }

  return res.status(200).json({likedMovies})
}catch(err){
console.error("Error while getting like movies", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
}
module.exports = { GetLikeMovies };
