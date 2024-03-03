const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const transporter = require("../../utils/mail");
var ejs = require("ejs");
var path = require("path");
const sendVerifyEmail = require("./utils/VerifyEmail");

const register = async (req, res) => {
  const data = req.body;

  // check for valid data

  if (!data.username)
    return res.status(400).json({
      error: true,
      msg: "username is required",
    });

  if (!data.email)
    return res.status(400).json({
      error: true,
      msg: "email is required",
    });

  // check for existing user

  let userExist = await User.findOne({ username: data.username });

  if (userExist)
    return res
      .status(500)
      .json({ error: true, msg: "username already exists" });

  userExist = await User.status(409).findOne({ email: data.email });

  if (userExist)
    return res.status(409).json({ error: true, msg: "email already exists" });

  // sending email verification mail

  sendVerifyEmail(data, req.headers.host)
    .then(() => {
      return new User({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        password: data.password,
      }).save();
    })
    .then((user) => {
      res.send({
        msg: "User registered successfully",
        data: {
          username: user?.username,
          email: user?.email,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: true, msg: "Some internal error occurred" });
    });
};

module.exports = register;
