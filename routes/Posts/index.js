const { Router } = require("express");
const Posts = require("../../models/postModel");
const required = require("../../utils/required");
const internalError = require("../../utils/InternalError");
const CreatePost = require("./CreatePosts");
const { handleLikes, AddComment } = require("./PostInteractions");
const GetPost = require("./GetPost");
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

router.get("/get", GetPost);
router.post("/create-new", required(["user"]), CreatePost);
router.post("/like", required(["post_id"]), handleLikes);
router.post("/add-comment", AddComment);

module.exports = router;
