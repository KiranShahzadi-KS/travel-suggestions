const express = require("express");
const multer = require("multer");
const { upload } = require("../utils/imgUpload");
const {
  addPlace,
  updatePlace,
  getOnePlace,
  getAll,
  deletePlace,
} = require("../controllers/placeController");

const router = express.Router();

router.post("/add", upload("place").single("image"), addPlace);
router.post("/update/:placeId", upload("place").single("image"), updatePlace);
router.get("/getDetails/:_id", getOnePlace);
router.get("/", getAll);
router.delete("/deleteplace/:_id", deletePlace);

module.exports = router;
