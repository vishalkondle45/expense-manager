const express = require("express");
const { newExpense, myExpenses } = require("../controllers/expense");
const { verifyToken } = require("../controllers/user");

const router = express.Router();

router.post("/new", verifyToken, newExpense);
router.get("/:groupId", myExpenses);

module.exports = router;
