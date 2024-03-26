const Notifications = require("../../models/NotificationModel");
const internalError = require("../../utils/InternalError");

const getAllNotifications = (req, res) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ msg: "user_id is not valid" });

  Notifications.find({
    user: user_id,
  })
    .then((data) =>
      res.json({
        notifications: data,
      })
    )
    .catch((e) => res.status(400).json({ error: e }));
};

module.exports = getAllNotifications;
