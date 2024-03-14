const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  img: String,
  username: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  caption: String,
  likes: { type: Number, default: 0 },
  Shares: { type: Number, default: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [{ author: String, comment: String, date: Date }],
});

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;

