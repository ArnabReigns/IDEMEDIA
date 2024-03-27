const { Router } = require("express");
const getAllNotifications = require("./getAllNotifications");
const createNtification = require("./createNtification");
const deleteAll = require("./deleteAll");
const router = Router();

router.post("/get-all", getAllNotifications);
router.delete("/all", deleteAll);
router.post("/create-new", createNtification);

module.exports = router;
