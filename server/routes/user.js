const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  // refreshToken,
  logout,
  activate,
} = require("../controllers/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/verify", activate);
// router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
