const jwt = require("jsonwebtoken");
const internalError = require("../../utils/InternalError");
const User = require("../../models/UserModel");

const me = async (req, res) => {
  const token = req.cookies.tlog;

  if (!token)
    return res.status(401).json({
      loggedin: false,
    });

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) return internalError(res);

    if (decoded) {
      try {
        const user = await User.findOne(
          { username: decoded.username },
          "-__v -password"
        )
          .populate(
            "followers following",
            "-password -followers -following -posts"
          )
          .populate("posts")
          .exec();

        if (user)
          return res.status(200).json({
            loggedin: true,
            user: user,
          });
      } catch (e) {
        console.log(e);
        return internalError(res);
      }
    }
  });
};

module.exports = me;
