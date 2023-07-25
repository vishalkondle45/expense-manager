const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  let isEmailRegistered;
  try {
    isEmailRegistered = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
  if (isEmailRegistered) {
    return res
      .status(409)
      .json({ message: "Email is already registered, Login instead" });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password);
  const user = new User({ ...req.body, password: hashedPassword });

  try {
    await user.save();
    return res.status(201).json({
      message: `User created successfully`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.login = async (req, res, next) => {
  let isEmailRegistered;
  try {
    isEmailRegistered = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
  if (!isEmailRegistered) {
    return res.status(404).json({ message: "Email not found, Signup please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    isEmailRegistered.password
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid Email / Password" });
  }
  const token = jwt.sign(
    { _id: isEmailRegistered._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  console.log("Generated Token\n", token);

  if (req.cookies[`${isEmailRegistered._id}`]) {
    req.cookies[`${isEmailRegistered._id}`] = "";
  }

  res.cookie(String(isEmailRegistered._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    sameSite: "lax",
  });
  return res.status(200).json({
    message: "Successfully Logged In",
    token,
    user: isEmailRegistered,
  });
};

exports.verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "Token not found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req._id = user._id;
  });
  next();
};

exports.getUser = async (req, res, next) => {
  const _id = req._id;
  let user;
  try {
    user = await User.findById(_id, "-password");
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      stack: error.stack,
    });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Token Verified", user });
};

// exports.refreshToken = async (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies?.split("=")[1];
//   if (!prevToken) {
//     return res.status(404).json({ message: "Token not found" });
//   }
//   jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid Token" });
//     }
//     res.clearCookie(`${user._id}`);
//     req.cookies[`${user._id}`] = "";
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "35s",
//     });

//     console.log("Re-Generated Token\n", token);
//     res.cookie(String(user._id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 30),
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     req._id = user._id;
//     next();
//   });
// };

exports.logout = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "Token not found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    res.clearCookie(`${user._id}`);
    req.cookies[`${user._id}`] = "";
    res.status(200).json({ message: "Successfully logged out" });
  });
};
