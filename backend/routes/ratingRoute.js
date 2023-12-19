const express = require("express");
const router = express.Router();

const {
  addRating,
  getByPlaceId,
  getByUserId,
} = require("../controllers/ratingController");

router.post("/create", addRating);
router.get("/getByPlace/:placeId", getByPlaceId);
router.get("/getByUser/:userId", getByUserId);

module.exports = router;
