const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//User Registration
exports.registerUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //Find User
    const isUser = await User.findOne({ email: email });

    if (!isUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create User
      const newUser = new User({
        email: email,
        password: hashedPassword,
        role: req.body.role,
      });

      await newUser.save();
      res.status(200).json({
        success: true,
        message: "User Successfully Created!",
        newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User with email already registerd!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create a user. Please try again!",
    });
  }
};

// LOGIN
exports.logIn = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // If the user exists, check the password and compare the password
    const comparedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If the password is incorrect
    if (!comparedPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    const { password, role, ...rest } = user._doc; // Display all fields except password and role

    // Create JWT Token for authentication
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, data: { ...rest } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Log In" });
  }
};
