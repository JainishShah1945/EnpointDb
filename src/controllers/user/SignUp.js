const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {PrismaClient} = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

const SignUp =  async (req, res) => {
  const { username, email, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashpassword,
      },
      select: {
        name: true,
        email: true,
      },
    });
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User not created" });
  }
}
module.exports = SignUp;
