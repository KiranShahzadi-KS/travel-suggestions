const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../utils/otpHelper");
const transporter = require("../utils/nodemailer");
const { validateOTP } = require("../utils/otpHelper");

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

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { _id } = req.params;
  const { username, location, AVATAR_IMG } = req.body;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Find User and update
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        username,
        location,
        image: req.file?.filename,
      },
      { new: true }
    ); // { new: true } ensures that the updated document is returned

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating user information. Please try again!",
      error: error.message,
    });
  }
};

//DELETE USER
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    //Delete the User
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//FORGET PASSWORD
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique OTP and set its expiry time
    const OTP = generateOTP();
    const OTPExpiry = new Date();
    OTPExpiry.setMinutes(OTPExpiry.getMinutes() + 120); // OTP expires in 2 hours

    // Update user with the OTP and expiry time
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          otp: OTP,
          otpExpiry: OTPExpiry,
        },
      },
      { new: true }
    );

    // Send password reset email with OTP to the user
    await transporter.sendMail({
      from: "kiranraja557@gmail.com",
      to: email, //valid email jis ki tef code send ho ga
      subject: "Password Reset Request",
      text: `Your OTP for password reset is: ${OTP}`,
    });

    res.json({
      message: "Password reset OTP sent successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // find user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    // Validate the provided OTP
    const isOTPValid = validateOTP(otp, user.otp, user.otpExpiry);

    if (!isOTPValid) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Clear OTP and OTPExpiry in the user document
    await User.findByIdAndUpdate(user._id, {
      $unset: { otp: 1, otpExpiry: 1 },
    });

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate and hash the new password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
