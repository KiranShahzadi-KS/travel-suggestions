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

    const actionMessage = blockStatus ? "blocked" : "unblocked";

    res.json({ message: `User ${actionMessage} successfully`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
