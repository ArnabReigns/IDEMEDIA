const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user)
    return res.status(400).json({
      msg: "Invalid Credentials",
    });

  if (user.isActive == false)
    return res.status(400).json({
      msg: "email not verified",
    });

  const matched = await bcrypt.compare(password, user.password);

  if (matched) {
    return res.json({
      msg: "log in successful",
      user: user.username,
    });
  } else {
    return res.status(400).json({
      msg: "Invalid Credentials",
    });
  }
};

module.exports = login;
