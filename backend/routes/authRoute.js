const express = require("express");
const { registerUser, logIn } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logIn);

module.exports = router;
