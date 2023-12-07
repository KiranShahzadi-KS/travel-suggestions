const express = require("express");
const Router = express.Router();

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const amenitiesRouter = require("./amenitiesRoute");
const restCategoryRouter = require("./resCategoryRoute");
const hotelTypeRouter = require("./hotelTypeRoute");
const cuisinesRouter = require("./cuisinesRoute");
const mealRouter = require("./mealRoute");
const placeTypeRouter = require("./placeTypeRoute");
const placeRouter = require("./placeRoute");

Router.use("/auth", authRouter);
Router.use("/user", userRouter);
Router.use("/amenities", amenitiesRouter);
Router.use("/restCate", restCategoryRouter);
Router.use("/hotelType", hotelTypeRouter);
Router.use("/cuisines", cuisinesRouter);
Router.use("/meal", mealRouter);
Router.use("/placetype", placeTypeRouter);
Router.use("/place", placeRouter);

module.exports = Router;
