const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

const fetchCinemas = async (req, res) => {
  try {
    const CINEMA_API = process.env.CINEMA_API;

    if (!CINEMA_API) {
      return res.status(500).json({ message: "No API key found" });
    }

    const response = await axios.get(CINEMA_API);
    const cinemas = response.data.data;

    console.log(cinemas);

    for (const cinema of cinemas) {  
      console.log(cinema.name);

      if (!cinema.id || !cinema.name) {
        console.warn("Skipping cinema with missing ID or name:", cinema);
        continue;
      }

      await prisma.cinema.upsert({
        where: { id: cinema.id },
        update: {
          name: cinema.name,
        },
        create: {
          id: cinema.id,
          name: cinema.name,
        },
      });
    }

    res.status(200).json({ message: "Cinemas fetched and stored successfully" });
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    res.status(500).json({ message: "Error fetching cinemas", error: error.message });
  }
};

module.exports = { fetchCinemas };
