const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Post schema
const postSchema = new mongoose.Schema({
  img: String,
  username: String,
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
