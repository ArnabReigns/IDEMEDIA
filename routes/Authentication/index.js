const { Router } = require("express");
const router = Router();

const login = require("./Login");
const register = require("./Register");
const emailVerification = require("./EmailVerification");
const sendVerificationMail = require("./SendVerificationMail");
const me = require("./Me");
const required = require("../../utils/required");
const logout = require("./Logout");

router.post("/login/", login); // check for password and sets a http only cookie
router.post("/register/", required(["first_name", "last_name"]), register); // register user as a inactive user and send a verification mail
router.post("/accounts/activation/", sendVerificationMail); // send a email verification mail
router.get("/accounts/activation/:id", emailVerification); // verifies the email and make the user active
router.get("/accounts/me", me); // current logged in user
router.get("/logout", logout);

module.exports = router;
