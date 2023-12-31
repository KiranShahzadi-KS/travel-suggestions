const express = require("express");

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  forgetPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/userController");
const multer = require("multer");

const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../utils/imgUpload");
// const user = multer({ storage: upload("user") }); ///

const { blockUnblockUser } = require("../controllers/adminController");
const router = express.Router();

router.get("/getAuser/:id", authMiddleware, getUser);
router.get("/getAll", authMiddleware, getAllUsers);
router.post(
  "/updateUser/:_id",
  authMiddleware,
  upload("users").single("image"),
  updateUser
);
router.delete("/deleteUser/:userId", authMiddleware, deleteUser);

//Password
router.post("/forgetPassword", forgetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

//Admin APi
router.post("/blockUnblock", blockUnblockUser);
module.exports = router;
