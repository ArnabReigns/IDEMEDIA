const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const auth = (req, res, next) => {
  const token = req.cookies.tlog;
  req.user = null;

  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
    if (err) {
      return next();
    }

    user = await User.findOne({ username: decode.username });
    if (user) req.user = user;
    return next();
  });
};

module.exports = auth;
