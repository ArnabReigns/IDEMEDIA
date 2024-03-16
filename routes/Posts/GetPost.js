const Posts = require("../../models/postModel");

const GetPost = async (req, res) => {
  const post_id = req.query.id;
  console.log(post_id);
  try {
    const post = await Posts.findById(post_id)
      .populate("likes", "-posts -followers -following -liked_posts -password")
      .populate({
        path: "comments",
        populate: "replies",
      })
      .exec();
    return res.json(post);
  } catch (e) {
    console.log(e);
    return internalError(res);
  }
};

module.exports = GetPost;
