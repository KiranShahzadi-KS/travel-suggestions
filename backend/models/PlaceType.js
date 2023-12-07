const mongoose = require("mongoose");

const placeTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["visiting type", "hotel type", "resturant type"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlaceType", placeTypeSchema);
