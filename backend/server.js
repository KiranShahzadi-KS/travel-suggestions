const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/dbConnection");
const Router = require("./routes/indexRoute");
const app = express();
dotenv.config();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

//SERVER CONNECTION
connectDB();

//Router Connection
app.use("/api/v1/", Router);

//SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
