const Posts = require("../../models/postModel");
const internalError = require("../../utils/InternalError");

const getAll = async (req, res) => {
  console.log(req.user?.following);
  try {
    const posts = await Posts.find({
      $or: [
        {
          user: {
            $in: req.user.following,
          },
        },
        {
          user: req.user._id,
        },
      ],
    })
      .sort({ date: -1 })
      .populate(
        "user",
        "-password -__v -followers -following -liked_posts -password -posts"
      )
      .populate(
        "likes",
        "-posts -followers -following -liked_posts -password -posts"
      )
      .exec();
    return res.json({ posts });
  } catch (e) {
    internalError(res);
  }
};

module.exports = getAll;
