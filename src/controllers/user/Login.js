const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {PrismaClient} = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const Login =  async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await prisma.user.findFirst({
      where: { email },
    });

    if (!check) {
      return res.status(404).json({ message: "Invalid user" });
    }

    if (!(await bcrypt.compare(password, check.password))) {
      return res.status(404).json({ message: "invalid password" });
    }

    const token = jwt.sign({ id: check.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ messsage: "user login siccessfully", token, name: check.name, email: check.email });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

module.exports = Login
