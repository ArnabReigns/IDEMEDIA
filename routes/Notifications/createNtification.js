const Notifications = require("../../models/NotificationModel");
const internalError = require("../../utils/InternalError");

const createNtification = (req, res) => {
  const data = req.body;

  new Notifications({
    ...data,
  })
    .save()
    .then((data) =>
      res.json({
        notifications: data,
      })
    )
    .catch((e) => res.status(400).json({ error: e }));
};

module.exports = createNtification;
