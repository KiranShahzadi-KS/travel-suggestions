const express = require("express");
const {
  createRestaurantCategory,
  updatedRestaurantCategory,
  getAresCate,
  getAllResCate,
  deleteRestCategory,
} = require("../controllers/restaurant_CategoryController");
const multer = require("multer");
const { upload } = require("../utils/imgUpload");
const router = express.Router();

router.post(
  "/addRestCate",
  upload("restaurantCategory").single("image"),
  createRestaurantCategory
);
router.post(
  "/update",
  upload("restaurantCategory").single("image"),
  updatedRestaurantCategory
);
router.get("/getSingle", getAresCate);
router.get("/getAll", getAllResCate);
router.delete("/delete", deleteRestCategory);

module.exports = router;
