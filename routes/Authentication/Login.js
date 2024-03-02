const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;

  

  const user = await User.findOne({ username: username });

  if (!user)
    return res.status(400).json({
      msg: "Invalid Credentials",
    });

  if (user.isActive == false)
    return res.status(400).json({
      inactive: true,
      msg: "email not verified",
    });

  const matched = await bcrypt.compare(password, user.password);

  if (matched) {
    // create token
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // res.setHeader("Set-Cookie", `tlog=${token}; HttpOnly`);

    res.cookie("tlog", token, { httpOnly: true });
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
