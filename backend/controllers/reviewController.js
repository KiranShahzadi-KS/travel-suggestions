const Place = require("../models/Place");
const Review = require("../models/Review");
const User = require("../models/User");

//ADD REVIEW
exports.addReview = async (req, res) => {
  try {
    const { userId, placeId, title, description, select_visit } = req.body;
    const isUser = await User.findById(userId);
    if (!isUser) {
      res.status(404).json({ success: false, message: "User not found!" });
    } else {
      const isPlace = await Place.findById(placeId);
      if (!isPlace) {
        res.status(404).json({ success: false, message: "Place not found!" });
      } else {
        const newReview = new Review({
          userId,
          placeId,
          title,
          description,
          select_visit,
        });
        await newReview.save();
        res.status(200).json({
          success: true,
          message: "Review create successfully!",
          newReview,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: true, message: "Internal Server Error", error });
  }
};

//UPDATE REVIEW
exports.updateReview = async (req, res) => {
  try {
    const { _id } = req.body;
    const { title, description, select_visit } = req.body;
    const isReview = await Review.findById(_id);
    if (!isReview) {
      res
        .status(404)
        .json({ success: false, message: "Invalid Id, Review not found!" });
    } else {
      const updatedReview = await Review.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          select_visit,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Review Updated successfully!",
        updatedReview,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

//DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {
    const { _id } = req.body;
    const isReview = await Review.findById(_id);
    console.log(_id);
    if (!isReview) {
      return res
        .status(404)
        .status({ message: "Review of this Id is not found" });
    }

    await Review.findByIdAndDelete(_id);
    console.log(isReview);
    return res
      .status(200)
      .json({ message: "The  review is Deleted  Successfully!", isReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!", error });
  }
};

// GET SINGLE REVIEW
exports.getSingleReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Review retrieved successfully!",
      review,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// GET REVIEWS BY USERID
exports.getReviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const isUser = await User.findById(userId);

    if (!isUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const reviews = await Review.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully!",
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// GET REVIEWS BY PLACEID
exports.getReviewsByPlaceId = async (req, res) => {
  try {
    const { placeId } = req.params;

    const isPlace = await Place.findById(placeId);

    if (!isPlace) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found!" });
    }

    const reviews = await Review.find({ placeId });

    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully!",
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// GET ALL REVIEWS
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    return res.status(200).json({
      success: true,
      message: "All reviews retrieved successfully!",
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};
