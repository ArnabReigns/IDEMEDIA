const Comment = require("../../models/CommentModel");
const Posts = require("../../models/postModel");
const internalError = require("../../utils/InternalError");


const GetPost = async (req, res) => {
  const post_id = req.query.id;

  try {
    const post = await Posts.findById(post_id)
      .populate("likes", "-posts -followers -following -liked_posts -password")
      .populate({
        path: "comments",
        populate: [
          {
            path: "replies",
            populate: {
              path: "commentator",
              select:
                "-posts -followers -following -liked_posts -password -posts",
            },
          },
          {
            path: "commentator",
            select:
              "-posts -followers -following -liked_posts -password -posts",
          },
        ],
      })
      .exec();
    const comments = await Comment.find({ post_id: post_id });
    return res.json({ post, total_comment: comments.length });
  } catch (e) {
    console.log(e);
    return internalError(res);
  }
};

module.exports = GetPost;
