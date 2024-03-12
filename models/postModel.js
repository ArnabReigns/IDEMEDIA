const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Post schema
const postSchema = new mongoose.Schema({
  img: String,
  caption: String,
  likes: { type: Number, default: 0 },
  Shares: { type: Number, default: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [{ author: String, comment: String, date: Date }],
});

postSchema.pre("save", async function (next) {
  next();
});

const Posts = mongoose.model("Post", postSchema);
module.exports = Posts;
