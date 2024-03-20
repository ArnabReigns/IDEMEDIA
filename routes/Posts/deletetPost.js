const Posts = require("../../models/postModel");
const internalError = require("../../utils/InternalError");

const DeletePost = async (req, res) => {
  const post_id = req.query.id;

  try {
    const post = await Posts.findByIdAndDelete(post_id);
    res.json({
      msg: "deleted",
      success: true,
    });
  } catch (e) {
    console.log(e);
    internalError(res);
  }
};

module.exports = DeletePost;
