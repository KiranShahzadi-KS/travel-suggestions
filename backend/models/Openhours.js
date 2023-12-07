const mongoose = require("mongoose");
const hoursSchema = new mongoose.Schema(
  {
    Monday: {
      type: String,
    },
    Tuesday: {
      type: String,
    },
    Wednesday: {
      type: String,
    },
    Thursday: {
      type: String,
    },
    Friday: {
      type: String,
    },
    Saturday: {
      type: String,
    },
    Sunday: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OpenHours", hoursSchema);
