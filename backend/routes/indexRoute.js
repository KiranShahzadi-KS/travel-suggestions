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
const ratingRouter = require("./ratingRoute");
const reviewRouter = require("./reviewRoute");
const notificationRouter = require("./notificationsRoute");

Router.use("/auth", authRouter);
Router.use("/user", userRouter);
Router.use("/amenities", amenitiesRouter);
Router.use("/restCate", restCategoryRouter);
Router.use("/hotelType", hotelTypeRouter);
Router.use("/cuisines", cuisinesRouter);
Router.use("/meal", mealRouter);
Router.use("/placetype", placeTypeRouter);
Router.use("/place", placeRouter);
Router.use("/rating", ratingRouter);
Router.use("/review", reviewRouter);
Router.use("/notification", notificationRouter);

module.exports = Router;
