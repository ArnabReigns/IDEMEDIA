const { Router } = require("express");
const Posts = require("../../models/postModel");
const required = require("../../utils/required");
const router = Router();

router.get("/hello", (req, res) => {
  res.send("hi");
});

router.post(
  "/create-new",
  required(["caption", "img", "username"]),
  (req, res) => {
    const { caption, img, username } = req.body;
    console.log(caption, img, username);
    res.send("hello motherfuckaa!");
  }
);

module.exports = router;
