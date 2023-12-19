const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
    no_of_stars: {
      type: Number,
    },
    avg_rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
