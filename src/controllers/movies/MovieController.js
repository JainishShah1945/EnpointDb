const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const OMDB_API_KEY = process.env.OMDB_API;


const fetchMovies = async (req, res) => {
   try {
   const userId = req.user.id
    if (!OMDB_API_KEY) {
      console.error("OMDB API Key is missing");
      return res.status(500).json({ error: "OMDB API Key is missing" });
    }

    let movies = [];
    let page = 1;
    while (movies.length < 100) {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=Marvel&type=movie&page=${page}&apikey=${OMDB_API_KEY}`
      );

      if (!response.data || response.data.Response !== "True") {
        console.error("OMDB API Error:", response.data?.Error);
        break;
      }
    console.log(response.data);

      movies = [...movies, ...response.data.Search];

      if (response.data.Search.length < 10) break; 

      page++;
    }
  


    for (const movie of movies) {
      if (!movie.imdbID || !movie.Title) {
        console.warn("Skipping movie with missing IMDb ID or Title:", movie);
        continue;
      }

    const savedMovie =  await prisma.movie.upsert({
        where: { omdbId: movie.imdbID },
        update: {
          title: movie.Title,
          post : movie.Poster
          },
        create: {
          omdbId: movie.imdbID,
          title: movie.Title,
          post : movie.Poster
},
      });
      
await prisma.log.create({
    data : {

    userId:userId,
    action : "FETCH",
    entity:"MOVIE",
    entityId:savedMovie.id,
    message:"Movie Fetched From OMDB"

    }
});
}
    console.log("Movies updated in Movie table");
    return res.json({
      message: "Movies updated in Movie table"
})
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchMovies };



