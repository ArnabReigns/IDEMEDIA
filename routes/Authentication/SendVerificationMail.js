const User = require("../../models/UserModel");
const internalError = require("../../utils/InternalError");
const sendVerifyEmail = require("./utils/VerifyEmail");

const sendVerificationMail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).json({
        error: true,
        msg: "No user found assosiated with this mail id.",
      });

    if (user.isActive == true)
      return res.status(400).json({
        error: true,
        msg: "This account has already been activated.",
      });

    sendVerifyEmail(user).then(() =>
      res.json({
        msg: "mail sent successfully",
      })
    );
  } catch {
    return internalError(res);
  }
};

module.exports = sendVerificationMail;
