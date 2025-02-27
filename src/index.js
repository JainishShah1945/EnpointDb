const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute.js");
const movieRoute = require("./routes/movieRoute.js");
const cinemaRoute = require("./routes/cinemaRoute.js");
const uploadRoute = require("./routes/uploadRoute.js");
const orderRoute = require("./routes/orderRoute.js");



const authMiddleware = require("./middleware/authMiddleware.js");
 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); 
app.use("/api/userRoute",userRoute);
app.use("/api/movie",authMiddleware,movieRoute);
app.use("/api/cinema",authMiddleware,cinemaRoute);
app.use("/api/upload",authMiddleware,uploadRoute);
app.use("/api/order",orderRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`APP IS LISTENING ON PORT ${PORT}`));
