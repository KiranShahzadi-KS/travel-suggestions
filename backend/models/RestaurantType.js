const mongoose = require("mongoose");

const restaurantTypeSchema = new mongoose.Schema(
  {
    restaurantCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantCategory",
    },
    cuisines: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisine",
    },
    mealServed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    openHours: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "OpenHours",
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RestaurantType", restaurantTypeSchema);
