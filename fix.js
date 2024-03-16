const Comment = require("./models/CommentModel");
const Posts = require("./models/postModel");

module.exports = async (req, res) => {
  try {
    await deleteAllComments();
    res.send("fixed");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

async function deleteAllComments() {
  await Comment.deleteMany({});
  await Posts.updateMany({}, { comments: [] });
}
