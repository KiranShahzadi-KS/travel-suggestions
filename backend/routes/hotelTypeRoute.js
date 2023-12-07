const express = require("express");
const {
  createHotelType,
  updateHotelType,
  getAhotelType,
  getAllHotelType,
  deleteHotelType,
  searchHotelType,
} = require("../controllers/hotelTypeController");

const multer = require("multer");
const { upload } = require("../utils/imgUpload");
const router = express.Router();

router.post("/create", upload("hotelType").single("image"), createHotelType);
router.post("/update", upload("hotelType").single("image"), updateHotelType);
router.get("/getOne", getAhotelType);
router.get("/getAll", getAllHotelType);
router.delete("/delete", deleteHotelType);
router.post("/search", searchHotelType);

module.exports = router;
