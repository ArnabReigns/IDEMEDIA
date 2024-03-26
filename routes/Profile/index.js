const { Router } = require("express");
const router = Router();

const toggleFollow = require("./Follow");
const updateProfile = require("./updateProfile");
const Profile = require("./Profile");
const Search = require("./search");

router.get("/", Profile); // returns user by username
router.put("/update", updateProfile); // update user by username
router.post("/accounts/follow", toggleFollow); // toggle follow and unfollow functionality
router.post("/search", Search); // verifies the email and make the user active


module.exports = router;
