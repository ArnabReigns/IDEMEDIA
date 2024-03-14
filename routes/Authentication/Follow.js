const jwt = require("jsonwebtoken");
const internalError = require("../../utils/InternalError");
const User = require("../../models/UserModel");

const follow = async (req, res) => {
  const id = req.body.to;
  try {
    const user = await User.findById(id, "-__v -password");
    const owner = req.user;
    console.log(`${user.username} is followed by ${req.user?.username}`);

    if (user.followers.includes(owner._id))
      return res.status(400).json({ msg: "already followed" });
    user.followers.push(req.user._id);
    owner.following.push(user._id);
    await owner.save();
    await user.save();
    res.json({ msg: `${user.username} is followed by ${req.user?.username}`});
  } catch (e) {
    console.log(e);
    return internalError(res);
  }
};

module.exports = follow;
