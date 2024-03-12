const { Router } = require("express");
const Posts = require("../../models/postModel");
const required = require("../../utils/required");
const internalError = require("../../utils/InternalError");
const router = Router();

router.get("/get-all", async (req, res) => {});

router.post("/create-new", required(["username"]), async (req, res) => {
  const { caption, img, username } = req.body;

  try {
    
    await new Posts({ caption, img, username }).save();
    return res.status(201).json({ message: "Post Uploaded" });

  } catch (e) {
    internalError(res);
  }
});

module.exports = router;
