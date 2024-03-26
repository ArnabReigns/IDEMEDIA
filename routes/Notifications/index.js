const { Router } = require("express");
const getAllNotifications = require("./getAllNotifications");
const createNtification = require("./createNtification");
const router = Router();

router.post("/get-all", getAllNotifications);
router.post("/create-new", createNtification);

module.exports = router;
