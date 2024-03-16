const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  img: String,
  username: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  caption: String,
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

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;
