const Place = require("../models/Place");
const Rating = require("../models/Rating");
const User = require("../models/User");

//CREATE RATING
exports.addRating = async (req, res) => {
  try {
    const { userId, placeId, no_of_stars } = req.body;

    if (!userId || !placeId || !no_of_stars) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete DAta" });
    }
    //CreaTE a new Rating
    const newRating = new Rating({
      userId,
      placeId,
      no_of_stars,
    });
    //saVe Rating t0o dataBase
    await newRating.save();

    res.status(201).json({
      success: true,
      message: "Rating added successfully!",
      rating: newRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//GET RATING BY PLACEID
exports.getByPlaceId = async (req, res) => {
  try {
    const { placeId } = req.params;
    const getPlace = await Place.findById(placeId);

    if (!getPlace) {
      return res
        .status(404)
        .json({ success: false, message: "Place Not Found!" });
    }
    const ratings = await Rating.find({ placeId });

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Rating find for this place!" });
    }

    //Calculating Average Rating
    const totalStars = ratings.reduce(
      (sum, rating) => sum + parseInt(rating.no_of_stars),
      0
    );
    const avgRating = totalStars / ratings.length;
    res.status(200).json({
      success: true,
      message: "Rating retrieved successfully!",
      ratings,
      averageRating: avgRating.toFixed(2),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//GET RATING BY USERID
exports.getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const isUser = await User.findById(userId);
    console.log(isUser);
    if (!isUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    } else {
      const ratings = await Rating.find({ userId });
      return res
        .status(200)
        .json({ success: true, message: "Here is Ratings", ratings });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval Server Error" });
  }
};
