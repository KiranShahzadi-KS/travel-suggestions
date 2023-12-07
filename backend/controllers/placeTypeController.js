const PlaceType = require("../models/PlaceType");

exports.addPlaceType = async (req, res) => {
  try {
    const { name } = req.body;
    const newPlaceType = await PlaceType.create({
      name,
    });
    await newPlaceType.save();
    res.status(200).json({
      success: true,
      message: "Place Type successfully!",
      newPlaceType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Place Type. Please try again!",
    });
  }
};

exports.updatePlaceType = async (req, res) => {
  try {
    const { _id, name } = req.body;

    const placeType = await PlaceType.findById({ _id });
    if (!placeType) {
      return res.status(404).json({ success: false, message: "Not Found!" });
    }

    ///find and update
    const updatedPlaceType = await PlaceType.findByIdAndUpdate(
      _id,
      {
        name,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Place Type updated successfully!",
      updatedPlaceType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating Place Type information. Please try again!",
      error: error.message,
    });
  }
};

exports.getOnePlaceType = async (req, res) => {
  const { _id } = req.body;

  try {
    const getPlaceType = await PlaceType.findById({ _id });
    if (!getPlaceType) {
      return res.status(404).json({ success: false, message: "Not Found!" });
    }
    res.status(200).json({ success: true, getPlaceType });
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

exports.getAllPlaceType = async (req, res) => {
  try {
    const getAll = await PlaceType.find();
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

exports.deletePlaceType = async (req, res) => {
  const { _id } = req.body;
  try {
    const placeType = await PlaceType.findById(_id);
    if (!placeType) {
      return res.status(404).json({ message: "Place Type not Found!" });
    }
    await PlaceType.findByIdAndDelete(_id);
    res.json({ message: "Place Type Deleted  Successfully!", placeType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
