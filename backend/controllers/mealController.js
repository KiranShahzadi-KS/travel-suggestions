const Meal = require("../models/Meal");

//Add Meal
exports.addMeal = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newMeal = await Meal.create({
      name,
      description,
      image: req.file?.filename,
    });
    await newMeal.save();

    res.status(200).json({
      success: true,
      message: " Meal created successfully!",
      newMeal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Meal. Please try again!",
    });
  }
};

//UPDATE Meal
exports.updateMeal = async (req, res) => {
  const { _id } = req.body;
  const { name, description } = req.body;

  try {
    const meal = await Meal.findById(_id);

    if (!meal) {
      return res
        .status(404)
        .json({ success: false, message: "Meal not found!" });
    }

    // Find and update
    const updatedmeal = await Meal.findByIdAndUpdate(
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
      message: "Meal updated successfully!",
      updatedmeal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating meal information. Please try again!",
      error: error.message,
    });
  }
};

//DELETE Meal
exports.deleteMeal = async (req, res) => {
  const { _id } = req.body;

  try {
    const meal = await Meal.findById(_id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not Found!" });
    }
    //DElete  mEaL
    await Meal.findByIdAndDelete(_id);
    res.json({ message: "Mael Deleted  Successfully!", meal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//GET SINGLE Meal
exports.getAMeal = async (req, res) => {
  const { _id } = req.body;
  try {
    const getMeal = await Meal.findById(_id);
    if (!getMeal) {
      return res.status(404).json({ success: false, message: " Not Found!" });
    }

    res.status(200).json({ success: true, getMeal });
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

//GET ALL Meal
exports.getAllMeal = async (req, res) => {
  try {
    const getAll = await Meal.find();
    res.status(200).json({
      success: true,
      message: "Find Successfully!",
      getAll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
