const express = require("express");
const Router = express.Router();

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");

Router.use("/auth", authRouter);
Router.use("/user", userRouter);

module.exports = Router;
