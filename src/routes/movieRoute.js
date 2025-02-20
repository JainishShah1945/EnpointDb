const express = require("express");
const { fetchMovies } = require("../controllers/movies/movieController");
const { SeeMovies } = require("../controllers/movies/SeeMovies");
const { CreateMovie } = require("../controllers/movies/CreateMovie");
const { UpdateMovie } = require("../controllers/movies/UpdateMovie");
const { DeleteMovie } = require("../controllers/movies/DeleteMovie");
const { SearchMovie } = require("../controllers/movies/SearchMovie");

const {LikeMovie} = require("../controllers/likes/MovieLike.js")
const {GetLikeMovies} = require("../controllers/likes/GetLikeMovie.js")


const router = express.Router();

router.get("/", fetchMovies);  
router.get("/see",SeeMovies);
router.post("/create",CreateMovie);
router.put("/update",UpdateMovie);
router.delete("/delete",DeleteMovie);
router.get("/search",SearchMovie);
router.post("/like",LikeMovie);
router.get("/seelike",GetLikeMovies);


module.exports = router;

