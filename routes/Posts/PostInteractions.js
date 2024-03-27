const internalError = require("../../utils/InternalError");
const Posts = require("../../models/postModel");
const Comment = require("../../models/CommentModel");
const notify = require("../Notifications/utils/Notify");

async function like(owner, post) {
  post.likes.push(owner._id);
  owner.liked_posts.push(post._id);
  await owner.save();
  await post.save();

  return {
    msg: `post_${post._id} is liked by ${owner?.username}`,
  };
}

async function unlike(owner, post) {
  post.likes = post.likes.filter(
    (item) => item.toString() !== owner._id.toString()
  );
  owner.liked_posts = owner.liked_posts.filter(
    (item) => item.toString() !== post._id.toString()
  );

  await owner.save();
  await post.save();
  return {
    msg: `post_${post._id} is unliked by ${owner?.username}`,
  };
}

const handleLikes = async (req, res) => {
  const post_id = req.body.post_id;
  try {
    const post = await Posts.findById(post_id);
    const owner = req.user;
    if (post.likes.includes(owner._id)) {
      return res.json(await unlike(owner, post));
    } else {
      if (owner._id.toString() == post.user._id.toString()) return;
      else
        notify(
          req.io,
          {
            title: `${owner.username} liked your post`,
            user: post.user._id,
            type: "like_post",
            data: {
              post: { id: post._id, url: post.img },
              liked_by: {
                username: owner?.username,
                profile_pic: owner?.profile_pic,
                id: owner?._id,
              },
            },
          },
          {
            roomNames: [post.user._id.toString()],
            emitName: "notification",
          }
        );
      return res.json(await like(owner, post));
    }
  } catch (e) {
    console.log(e);
    return internalError(res);
  }
};

const AddComment = async (req, res) => {
  const { img, comment, post_id, isReply, replied_to } = req.body;

  try {
    if (isReply) {
      if (replied_to == null)
        throw { err: "required replied_to when isReply is TRUE." };
      let replying_to = await Comment.findById(replied_to);
      if (comment == null) throw { err: "COMMENT NOT FOUND" };
      const new_comment = await new Comment({
        img,
        comment,
        isReply,
        post_id,
        replied_to,
        commentator: req.user?._id,
      }).save();
      replying_to.replies.push(new_comment._id);
      await replying_to.save();

      return res.json({
        msg: `${req.user?.username} commented on the comment_${replying_to._id}`,
      });
    } else {
      const post = await Posts.findById(post_id);
      if (post == null) throw { err: "POST NOT FOUND" };
      const new_comment = await new Comment({
        img,
        comment,
        isReply,
        post_id,
        replied_to,
        commentator: req.user?._id,
      }).save();
      post.comments.push(new_comment._id);
      await post.save();
      return res.json({
        msg: `${req.user?.username} commented on the post_${post._id}`,
      });
    }
  } catch (err) {
    console.log(err);
    return internalError(res);
  }
};

module.exports = { handleLikes, AddComment };
