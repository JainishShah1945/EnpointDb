const express = require("express");

const router = express.Router();

const {fetchCinemas} = require("../controllers/cinemas/CinemaController.js");
const {addMovieToCinema} = require("../controllers/cinemas/AddMovieToCinema.js");
const {LikeCinema} = require("../controllers/likes/CinemaLike.js");
const {GetLikeCinema} = require("../controllers/likes/GetLikeCinema.js");

router.get("/",fetchCinemas);
router.put("/add",addMovieToCinema);
router.post("/like",LikeCinema);
router.get("/cinema-likes",GetLikeCinema);


module.exports = router;
