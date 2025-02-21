const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); 

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const tokenParts = token.split(" ");
    const authToken = tokenParts.length === 2 ? tokenParts[1] : token;

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
      }

      req.user = decoded;
      next();
    });

    
    

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
