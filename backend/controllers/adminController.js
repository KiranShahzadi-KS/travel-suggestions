const User = require("../models/User");

exports.blockUnblockUser = async (req, res) => {
  const { _id, blockStatus } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.status = blockStatus;
    await user.save();

    if (blockStatus === "true") {
      res.json({ message: `User Blocked successfully`, user });
    } else {
      res.json({ message: `User Unblocked successfully`, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
