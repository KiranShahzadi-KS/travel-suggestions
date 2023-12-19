const express = require("express");
const {
  addReview,
  updateReview,
  deleteReview,
  getSingleReview,
  getReviewsByUserId,
  getReviewsByPlaceId,
  getAllReviews,
} = require("../controllers/reviewController");
const router = express.Router();

router.post("/addReview", addReview);
router.post("/updateReview", updateReview);
router.delete("/deleteReview", deleteReview);
router.get("/singleReview/:reviewId", getSingleReview);
router.get("/getbyUserid/:userId", getReviewsByUserId);
router.get("/getByPlaceId/:placeId", getReviewsByPlaceId);
router.get("/", getAllReviews);

module.exports = router;
