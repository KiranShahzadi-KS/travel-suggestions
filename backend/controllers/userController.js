const User = require("../models/User");

//GET A SINGLE USER
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getAuser = await User.findById(id);

    if (!getAuser) {
      // User with the provided ID was not found
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User found
    res.status(200).json({
      success: true,
      user: getAuser,
    });
  } catch (error) {
    console.error(error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // General internal server error
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

//GET ALL USER
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
