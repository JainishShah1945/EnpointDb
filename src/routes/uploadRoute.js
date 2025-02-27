const express = require("express");
const upload = require("../middleware/uploadStorage.js");
const processImage = require("../controllers/uploads/Upload.js")
const router = express.Router();

router.post("/",upload.single("single"),processImage);

module.exports = router;