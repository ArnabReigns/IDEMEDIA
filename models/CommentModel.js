const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
  img: String,
  comment: String,
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  replied_to: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  commentator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  isReply: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentModel);
module.exports = Comment;
