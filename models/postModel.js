const mongoose = require("mongoose");
const Comment = require("./CommentModel");

// Define the Post schema
const postSchema = new mongoose.Schema({
  img: String,
  username: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

// Middleware to delete associated comments before removing the post
postSchema.pre("remove", async function (next) {
  try {
    // Remove all comments associated with this post
    await Comment.deleteMany({ _id: { $in: this.comments } });
    next();
  } catch (error) {
    next(error);
  }
});

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;
