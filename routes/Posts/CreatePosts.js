const User = require("../../models/UserModel");
const Posts = require("../../models/postModel");
const internalError = require("../../utils/InternalError");

const CreatePost = async (req, res) => {
  const { caption, img, user, type,poll } = req.body;

  try {
    const owner = await User.findOne({ _id: user });

    if (owner) {
      let new_post;
      if (type === "poll") {
        new_post = await new Posts({ caption, img, user, type, poll }).save();
      } else {
        new_post = await new Posts({ caption, img, user, type }).save();
      }
      owner.posts.push(new_post._id);
      await owner.save();
      return res.status(201).json({ message: "Post Uploaded" });
    }
  } catch (e) {
    console.log(e);
    internalError(res);
  }
};

module.exports = CreatePost;
