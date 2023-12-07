const express = require("express");

const multer = require("multer");
const { upload } = require("../utils/imgUpload");
const {
  addMeal,
  updateMeal,
  getAMeal,
  getAllMeal,
  deleteMeal,
} = require("../controllers/mealController");
const router = express.Router();

router.post("/add", upload("meal").single("image"), addMeal);
router.post("/update", upload("meal").single("image"), updateMeal);
router.get("/getOne", getAMeal);
router.get("/", getAllMeal);
router.delete("/delete", deleteMeal);

module.exports = router;
