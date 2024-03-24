const Comment = require("./models/CommentModel");
const Posts = require("./models/postModel");

const deleteAllCommentes = async (req, res) => {
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

const webs = (req, res) => {
  Posts.updateMany({}, { type: "Media" }).then((e) => res.send("done"));
};

module.exports = webs;
