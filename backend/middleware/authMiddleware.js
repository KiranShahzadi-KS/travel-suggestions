const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne(decoded.id);

        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No token attached to header",
    });
  }
};
