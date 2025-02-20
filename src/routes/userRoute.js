const express = require("express");
const router = express.Router();
const Login = require("../controllers/user/Login.js");
const SignUp = require("../controllers/user/SignUp.js");

router.post("/signup",SignUp);
router.post("/login",Login);

module.exports = router;
