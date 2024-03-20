const chalk = require("chalk");
const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

const emailVerification = (req, res) => {
  const token = req.params.id;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send("Activation Link Expired. Try Again!");
    } else {
      const email = decoded.user;
      console.log(chalk.green(`${email} is now activated`));

      return User.findOneAndUpdate(
        { email: email },
        {
          isActive: true,
        },
        {
          new: true,
        }
      )
        .then((r) => {
          res.send("Your Account is Activated! Now you can close this window.");
        })
        .catch((e) => {
          console.log(e);
          res.send("Error Occured");
        });
    }
  });
};

module.exports = emailVerification;
