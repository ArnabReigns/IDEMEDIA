const { Router } = require("express");
const Posts = require("../../models/postModel");
const required = require("../../utils/required");
const internalError = require("../../utils/InternalError");
const User = require("../../models/UserModel");
const router = Router();

router.get("/get-all", async (req, res) => {
  try {
    const posts = await Posts.find({})
      .sort({ date: -1 })
      .populate("user", "-password -__v")
      .exec();
    return res.json({ posts });
  } catch (e) {
    internalError(res);
  }
});

router.post("/create-new", required(["user"]), async (req, res) => {
  const { caption, img, user } = req.body;

  try {
    const owner = await User.findOne({ _id: user });

    if (owner) {
      const new_post = await new Posts({ caption, img, user }).save();
      owner.posts.push(new_post._id);
      await owner.save();
      return res.status(201).json({ message: "Post Uploaded" });
    }
  } catch (e) {
    console.log(e);
    internalError(res);
  }
});

module.exports = router;
