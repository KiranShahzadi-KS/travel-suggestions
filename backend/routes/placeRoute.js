const express = require("express");
const multer = require("multer");
const { upload } = require("../utils/imgUpload");
const { addPlace, updatePlace } = require("../controllers/placeController");

const router = express.Router();

router.post("/add", upload("place").single("image"), addPlace);
router.post("/update/:placeId", upload("place").single("image"), updatePlace);

module.exports = router;
