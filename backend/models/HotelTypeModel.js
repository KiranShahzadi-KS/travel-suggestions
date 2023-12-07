const mongoose = require("mongoose");
const hotelTypeModelSchema = new mongoose.Schema({
  numberOfRooms: {
    type: Number,
    required: true,
  },
  staffDeskAvailability: {
    type: String,
    enum: ["Yes", "NO"],
  },
  checkInTime: {
    type: String,
  },
  checkOutTime: {
    type: String,
  },
  providedHousekeeping: {
    type: String,
    enum: ["Yes", "NO"],
  },
  certifyingRepresentative: {
    type: String,
    enum: ["Yes", "NO"],
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

module.exports = mongoose.model("HotelTypeModel", hotelTypeModelSchema);
