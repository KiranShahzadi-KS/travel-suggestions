const express = require("express");

const multer = require("multer");
const { upload } = require("../utils/imgUpload");
const {
  createCuisines,
  updateCuisines,
  getACuisines,
  getAllCuisines,
  deleteCuisines,
} = require("../controllers/cuisinesController");
const router = express.Router();

router.post("/add", upload("cuisines").single("image"), createCuisines);
router.post("/update", upload("cuisines").single("image"), updateCuisines);
router.get("/getOne", getACuisines);
router.get("/", getAllCuisines);
router.delete("/delete", deleteCuisines);

module.exports = router;
