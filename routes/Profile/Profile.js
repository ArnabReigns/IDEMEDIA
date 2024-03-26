const jwt = require("jsonwebtoken");
const internalError = require("../../utils/InternalError");
const User = require("../../models/UserModel");

const Profile = async (req, res) => {
  const username = req.query.username;
  console.log(req.params);
  try {
    const user = await User.findOne({ username: username }, "-__v -password")
      .populate("posts")
      .populate(
        "followers following",
        "_id first_name last_name username email profile_pic"
      )
      .exec();
    if (user)
      return res.status(200).json({
        user: user,
      });
    else return res.status(404).json({ msg: "User Not Found!" });
  } catch (e) {
    console.log(e);
    return internalError(res);
  }
};

module.exports = Profile;
