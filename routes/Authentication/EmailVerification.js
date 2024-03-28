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
          console.log(chalk.green(`${email} is now activated`));

          const token = jwt.sign(
            { username: r.username },
            process.env.SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );

          res.cookie("tlog", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          res.redirect("https://camelcase.vercel.app/");
        })
        .catch((e) => {
          console.log(e);
          res.send("Error Occured");
        });
    }
  });
};

module.exports = emailVerification;
