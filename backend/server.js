const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/dbConnection");
const Router = require("./routes/indexRoute");
const app = express();
dotenv.config();

//-----
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
//-----

//MIDDLEWARE
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

//SERVER CONNECTION
connectDB();

//Router Connection
app.use("/api/v1/", Router);

//------
// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Listen for disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
//------

//SERVER START
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
