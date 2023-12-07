const mongoose = require("mongoose");

const commonTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    // placeTypeId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "PlaceType",
    // },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      loc_latitude: {
        type: String,
      },
      loc_longitude: {
        type: String,
      },
    },
    address: {
      state: { type: String },
      city: { type: String },
      street: { type: String },
      postalcode: { type: String },
    },
    websiteLink: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    amenities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenities",
    },
    role: {
      type: String,
    },
    currentlyOpen: {
      type: String,
      enum: ["Yes", "No"],
    },
    propertyDescription: {
      type: String,
    },
    certifyingRepresentative: {
      type: String,
      enum: ["Yes", "No"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", commonTypeSchema);
