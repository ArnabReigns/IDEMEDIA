const { Router } = require("express");
const router = Router();

const login = require("./Login");
const register = require("./Register");
const emailVerification = require("./EmailVerification");
const sendVerificationMail = require("./SendVerificationMail");
const me = require("./Me");
const required = require("../../utils/required");
const Search = require("./search");
const Profile = require("./Profile");
const follow = require("./Follow");
const auth = require("../../middlewares/auth");

router.post("/login/", login); // check for password and sets a http only cookie
router.post("/register/", required(["first_name", "last_name"]), register); // register user as a inactive user and send a verification mail
router.post("/accounts/activation/", sendVerificationMail); // send a email verification mail
router.get("/accounts/activation/:id", emailVerification); // verifies the email and make the user active
router.get("/accounts/me", me); // current logged in user

router.use(auth);

router.get("/accounts/profile", Profile); // returns user by username
router.post("/accounts/follow", follow); // returns user by username

router.get("/logout", (req, res) => {
  res.clearCookie("tlog", { httpOnly: true, sameSite: "none", secure: true });
  res.send({ loggedout: true });
});

router.post("/search", Search); // verifies the email and make the user active

module.exports = router;
