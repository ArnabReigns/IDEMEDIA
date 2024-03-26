const mongoose = require("mongoose");

const NotificaationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  desc: { type: String },
  link: { type: String },
  data: {},
  type: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notifications = mongoose.model("Notification", NotificaationSchema);
module.exports = Notifications;
