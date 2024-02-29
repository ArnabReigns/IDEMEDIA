const mongoose = require("mongoose");

const db = mongoose
  .connect(
    "mongodb+srv://Arnab:12345@devs.umobk28.mongodb.net/app?retryWrites=true&w=majority&appName=devs"
  )
  .then((r) => console.log("database connected"))
  .catch((err) => console.error(err));

module.exports = db;
