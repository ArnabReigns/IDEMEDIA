const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const mediaPoll = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: String,
      votes: { type: Number, default: 0 },
    },
  ],
  voters: {
    type: Array,
    ref: "User",
  },
});

const MediaPoll = mongoose.model("MediaPoll", mediaPoll);
module.exports = MediaPoll;
