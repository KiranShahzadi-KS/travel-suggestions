const express = require("express");
const {
  createAmenities,
  updateAmenities,
  deleteAmenities,
  getSingleAmenitie,
  getAllAmenities,
} = require("../controllers/amenitiesController");
const { upload } = require("../utils/imgUpload");
const multer = require("multer");

// const amenities = multer({ storage: upload("amenities") }); ///

const router = express.Router();

router.post(
  "/createAmenities",
  upload("amenities").single("image"),
  createAmenities
); ///
router.post(
  "/updateAmenities",
  upload("amenities").single("image"),
  updateAmenities
);
router.delete("/deleteAmenities", deleteAmenities);
router.get("/getAAmenitie", getSingleAmenitie);
router.get("/getAll", getAllAmenities);
module.exports = router;
