const express = require("express");
const {
  addPlaceType,
  updatePlaceType,
  getOnePlaceType,
  getAllPlaceType,
  deletePlaceType,
} = require("../controllers/placeTypeController");
const router = express.Router();

router.post("/add", addPlaceType);
router.post("/update", updatePlaceType);
router.get("/getone", getOnePlaceType);
router.get("/", getAllPlaceType);
router.delete("/delete", deletePlaceType);

module.exports = router;
