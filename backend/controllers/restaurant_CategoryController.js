const ResturantCategory = require("../models/RestaurantCategory");

//CREATE ResCate
exports.createRestaurantCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newRestaurantCategory = await ResturantCategory.create({
      name,
      description,
      image: req.file?.filename,
    });
    await newRestaurantCategory.save();

    res.status(200).json({
      success: true,
      message: "ResCate created successfully!",
      newRestaurantCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create ResCate. Please try again!",
    });
  }
};

//UPDATE AMENITIES
exports.updatedRestaurantCategory = async (req, res) => {
  const { _id } = req.body;
  const { name, description } = req.body;

  try {
    const restaurantCategory = await ResturantCategory.findById(_id);

    if (!restaurantCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Res Cate not found!" });
    }

    // Find User and update
    const updatedRestCategory = await ResturantCategory.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        image: req.file?.filename,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Res Cate updated successfully!",
      updatedRestCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating Res Cate information. Please try again!",
      error: error.message,
    });
  }
};

//DELETE AMENITIES
exports.deleteRestCategory = async (req, res) => {
  const { _id } = req.body;

  try {
    const resCate = await ResturantCategory.findById(_id);
    if (!resCate) {
      return res.status(404).json({ message: "Res Cate not Found!" });
    }
    //DElete  Res Cate
    await ResturantCategory.findByIdAndDelete(_id);
    res.json({ message: "Res Cate Deleted  Successfully!", resCate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//GET A AMENITIES
exports.getAresCate = async (req, res) => {
  const { _id } = req.body;
  try {
    const getSingleResCate = await ResturantCategory.findById(_id);
    if (!getSingleResCate) {
      return res
        .status(404)
        .json({ success: false, message: "REs Category Not Found!" });
    }

    res.status(200).json({ success: true, getSingleResCate });
  } catch (error) {
    console.error(error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // General internal server error
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

//GET ALL AMENITIES
exports.getAllResCate = async (req, res) => {
  try {
    const getAll = await ResturantCategory.find();
    res.status(200).json({
      success: true,
      getAll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
