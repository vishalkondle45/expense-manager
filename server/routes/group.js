const express = require("express");
const { newGroup, myGroups, getGroup } = require("../controllers/group");
const { verifyToken } = require("../controllers/user");

const router = express.Router();

router.post("/new", verifyToken, newGroup);
router.get("/my", verifyToken, myGroups);
router.get("/:groupId", verifyToken, getGroup);

module.exports = router;
