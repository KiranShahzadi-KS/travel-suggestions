const HotelType = require("../models/HotelType");

//CREATE Hotel Type
exports.createHotelType = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newHotelType = await HotelType.create({
      name,
      description,
      image: req.file?.filename,
    });
    await newHotelType.save();

    res.status(200).json({
      success: true,
      message: "Hotel created successfully!",
      newHotelType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Hotel Type. Please try again!",
    });
  }
};

//UPDATE HOTEL TYPE
exports.updateHotelType = async (req, res) => {
  const { _id } = req.body;
  const { name, description } = req.body;

  try {
    const hotelType = await HotelType.findById(_id);

    if (!hotelType) {
      return res
        .status(404)
        .json({ success: false, message: "hotelType not found!" });
    }

    // Find and update
    const updatedhotelType = await HotelType.findByIdAndUpdate(
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
      message: "Hotel Type updated successfully!",
      updatedhotelType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating Hotel Type information. Please try again!",
      error: error.message,
    });
  }
};

//DELETE HOTEL TYPE
exports.deleteHotelType = async (req, res) => {
  const { _id } = req.body;

  try {
    const hotelType = await HotelType.findById(_id);
    if (!hotelType) {
      return res.status(404).json({ message: "Hotal Type not Found!" });
    }
    //DElete  AMenitie
    await HotelType.findByIdAndDelete(_id);
    res.json({ message: "Hotel Type Deleted  Successfully!", hotelType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//GET SINGLE HOTEL TYPE
exports.getAhotelType = async (req, res) => {
  const { _id } = req.body;
  try {
    const getAHotelType = await HotelType.findById(_id);
    if (!getAHotelType) {
      return res.status(404).json({ success: false, message: " Not Found!" });
    }

    res.status(200).json({ success: true, getAHotelType });
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

//GET ALL HOTEL TYPES
exports.getAllHotelType = async (req, res) => {
  try {
    const getAll = await HotelType.find();
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

//SEARCH HOTEL TYPE ON THE BASE OF NAME
exports.searchHotelType = async (req, res) => {
  try {
    const { name } = req.body;

    const hotelType = await HotelType.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (hotelType.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No hotel type matching '${name}' found!`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Hotel types matching '${name}' found successfully!`,
      hotelType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error searching hotel types. Please try again!",
    });
  }
};
