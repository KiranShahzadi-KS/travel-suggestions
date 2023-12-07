const Amenities = require("../models/Amenities");

//CREATE AMENITIES
exports.createAmenities = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newAmenities = await Amenities.create({
      name,
      description,
      image: req.file?.filename,
    });
    await newAmenities.save();

    res.status(200).json({
      success: true,
      message: "Amenities created successfully!",
      newAmenities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Amenities. Please try again!",
    });
  }
};

//UPDATE AMENITIES
exports.updateAmenities = async (req, res) => {
  const { _id } = req.body;
  const { name, description } = req.body;

  try {
    const amenities = await Amenities.findById(_id);

    if (!amenities) {
      return res
        .status(404)
        .json({ success: false, message: "amenities not found!" });
    }

    // Find User and update
    const updatedAmenities = await Amenities.findByIdAndUpdate(
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
      message: "Amenities updated successfully!",
      updatedAmenities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating amenities information. Please try again!",
      error: error.message,
    });
  }
};

//DELETE AMENITIES
exports.deleteAmenities = async (req, res) => {
  const { _id } = req.body;

  try {
    const amenitie = await Amenities.findById(_id);
    if (!amenitie) {
      return res.status(404).json({ message: "Amenitie not Found!" });
    }
    //DElete  AMenitie
    await Amenities.findByIdAndDelete(_id);
    res.json({ message: "AMenties Deleted  Successfully!", amenitie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//GET A AMENITIES
exports.getSingleAmenitie = async (req, res) => {
  const { _id } = req.body;
  try {
    const getSingleAmenities = await Amenities.findById(_id);
    if (!getSingleAmenities) {
      return res
        .status(404)
        .json({ success: false, message: "Amenitie Not Found!" });
    }

    res.status(200).json({ success: true, getSingleAmenities });
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
exports.getAllAmenities = async (req, res) => {
  try {
    const getAll = await Amenities.find();
    res.status(200).json({
      success: true,
      getAll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
