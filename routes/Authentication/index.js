const { Router } = require("express");
const router = Router();

const login = require("./Login");
const register = require("./Register");
const emailVerification = require("./EmailVerification");

router.post("/login/", login);
router.post("/register/", register);
router.get("/accounts/activation/:id", emailVerification);

module.exports = router;
