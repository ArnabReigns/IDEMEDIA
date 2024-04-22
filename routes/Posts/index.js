const { Router } = require("express");
const router = Router();
const required = require("../../utils/required");

const CreatePost = require("./CreatePosts");
const CreatePoll = require("./CreatePoll");
const { handleLikes, AddComment } = require("./PostInteractions");
const GetPost = require("./GetPost");
const DeletePost = require("./deletetPost");
const getAll = require("./GetAll");
const VotePoll = require("./VoteMediaPoll");

router.get("/get-all", getAll);
router.get("/get", GetPost);
router.post("/vote-poll", VotePoll);
router.post("/create-new", required(["user"]), CreatePost);
router.post("/create-poll", required(["user"]), CreatePoll);
router.post("/like", required(["post_id"]), handleLikes);
router.post("/add-comment", AddComment);
router.delete("/", DeletePost);

module.exports = router;
