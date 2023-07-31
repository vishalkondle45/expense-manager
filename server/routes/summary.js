const express = require("express");
const { summaryByGroup } = require("../controllers/summary");
const { verifyToken } = require("../controllers/user");

const router = express.Router();

router.get("/summary/:groupId", verifyToken, summaryByGroup);

module.exports = router;
