const express = require("express");
const { default: mongoose } = require("mongoose");
const visitingTypeSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

module.exports = mongoose.model("VisitingType", visitingTypeSchema);
