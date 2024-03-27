const jwt = require("jsonwebtoken");
const internalError = require("../../utils/InternalError");
const User = require("../../models/UserModel");

const toggleFollow = async (req, res) => {
  const id = req.body.to;
  try {
    const user = await User.findById(id, "-__v -password");
    const owner = req.user;

    if (user.followers.includes(owner._id))
      return res.json(await unfollow(owner, user));
    else return res.json(await follow(owner, user));
  } catch (e) {
    return internalError(res);
  }
};

async function follow(owner, user) {
  user.followers.push(owner._id);
  owner.following.push(user._id);
  await owner.save();
  await user.save();
  return {
    msg: `${user.username} is followed by ${owner?.username}`,
  };
}

async function unfollow(owner, user) {
  user.followers = user.followers.filter(
    (item) => item.toString() !== owner._id.toString()
  );
  owner.following = owner.following.filter(
    (item) => item.toString() !== user._id.toString()
  );

  await owner.save();
  await user.save();
  return {
    msg: `${user.username} is unfollowed by ${owner?.username}`,
  };
}

module.exports = toggleFollow;
