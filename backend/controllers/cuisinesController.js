const Cuisines = require("../models/Cuisines");

//CREATE Cuisines
exports.createCuisines = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCuisines = await Cuisines.create({
      name,
      description,
      image: req.file?.filename,
    });
    await newCuisines.save();

    res.status(200).json({
      success: true,
      message: "Hotel created successfully!",
      newCuisines,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Cuisines. Please try again!",
    });
  }
};

//UPDATE Cuisines
exports.updateCuisines = async (req, res) => {
  const { _id } = req.body;
  const { name, description } = req.body;

  try {
    const cuisine = await Cuisines.findById(_id);

    if (!cuisine) {
      return res
        .status(404)
        .json({ success: false, message: "cuisine not found!" });
    }

    // Find User and update
    const updatedcuisine = await Cuisines.findByIdAndUpdate(
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
      message: "Cuisine updated successfully!",
      updatedcuisine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating cuisines information. Please try again!",
      error: error.message,
    });
  }
};

//DELETE Cuisines
exports.deleteCuisines = async (req, res) => {
  const { _id } = req.body;

  try {
    const cuisine = await Cuisines.findById(_id);
    if (!cuisine) {
      return res.status(404).json({ message: "cuisine not Found!" });
    }
    //DElete  AMenitie
    await Cuisines.findByIdAndDelete(_id);
    res.json({ message: "cuisine Deleted  Successfully!", cuisine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//GET SINGLE Cuisines
exports.getACuisines = async (req, res) => {
  const { _id } = req.body;
  try {
    const getACuisines = await Cuisines.findById(_id);
    if (!getACuisines) {
      return res.status(404).json({ success: false, message: " Not Found!" });
    }

    res.status(200).json({ success: true, getACuisines });
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

//GET ALL CuisinesS
exports.getAllCuisines = async (req, res) => {
  try {
    const getAll = await Cuisines.find();
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

//SEARCH Cuisines ON THE BASE OF NAME
exports.search = async (req, res) => {
  try {
    const { name } = req.body;

    const cuisine = await Cuisines.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (cuisine.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No Cuisines matching '${name}' found!`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Cuisine matching '${name}' found successfully!`,
      cuisine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error searching. Please try again!",
    });
  }
};
