const mongoose = require("mongoose");

const noticationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", noticationSchema);
