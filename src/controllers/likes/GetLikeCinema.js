const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetLikeCinema = async (req,res) => {
  try {
    const userId = req.user.id;

    const likedCinema = await prisma.LikeCinema.findMany({
      where: { userId },
    });

    if (!likedCinema.length) {
     
    return res.status(500).json({ message: "User had not liked any movie till yet" });
  }

  return res.status(200).json({likedCinema})
}catch(err){
console.error("Error while getting like Cinema", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
}
module.exports = { GetLikeCinema };
