const Notifications = require("../../models/NotificationModel");
const internalError = require("../../utils/InternalError");

const deleteAll = (req, res) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ msg: "user_id is not valid" });

  Notifications.deleteMany({
    user: user_id,
  })
    .then((data) =>
      res.json({
        msg: "Deleted All Notifications for " + user_id,
      })
    )
    .catch((e) => res.status(400).json({ error: e }));
};

module.exports = deleteAll;
