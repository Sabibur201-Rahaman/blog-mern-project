const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv config
dotenv.config();

//import router
const userRoutes = require("./routes/userRoutes");
const blogRoutes=require("./routes/blogRoutes")
const commentRoutes=require("./routes/commentRoutes")
//connection mongodb
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comment", commentRoutes);


//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(8080, () => {
  console.log(
    `server is running ${process.env.DEV_MODE}on port ${PORT}`.bgCyan.white
  );
});
