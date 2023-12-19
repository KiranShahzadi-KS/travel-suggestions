const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    select_visit: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
