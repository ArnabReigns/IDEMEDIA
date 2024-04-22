const mongoose = require("mongoose");
const Comment = require("./CommentModel");
const Notifications = require("./NotificationModel");

// Define the Post schema
const postSchema = new mongoose.Schema({
  img: String,
  username: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  poll: { type: mongoose.Schema.Types.ObjectId, ref: "MediaPoll" },
  caption: String,
  type: { type: String, default: "Media" },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  Shares: { type: Number, default: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
});

postSchema.post("findOneAndDelete", async function (doc) {
  const id = doc._id;
  console.log(id);
  try {
    await Comment.deleteMany({ _id: { $in: doc.comments } });
    await Notifications.deleteMany({
      type: "like_post",
      "data.post.id": id,
    });
  } catch (error) {
    console.log(error);
  }
});

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;
