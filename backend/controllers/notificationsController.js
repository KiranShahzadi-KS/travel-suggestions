exports.sendNotification = async (req, res) => {
  const { message } = req.body;

  io.emit("notification", { message });

  res.status(200).json({
    success: true,
    message: "Notification sent successfully!",
  });
};
