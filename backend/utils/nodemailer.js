const nodemailer = require("nodemailer");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kiranraja557@gmail.com",
    pass: "hvrq vpct tkmp nzyv",
  },
});

module.exports = transporter;

// user: "kiranraja557@gmail.com",
// pass: "hvrq vpct tkmp nzyv",
