const express = require("express");
const { sendNotification } = require("../controllers/notificationsController");
const router = express.Router();

router.post("/send", sendNotification);

module.exports = router;
