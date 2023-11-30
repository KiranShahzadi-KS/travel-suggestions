const express = require("express");
const { getUser, getAllUsers } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getAuser/:id", authMiddleware, getUser);
router.get("/getAll", authMiddleware, getAllUsers);

module.exports = router;
