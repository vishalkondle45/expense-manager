const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../config/library");

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
    let find = await User.findOne({ email: req.body.email });

    const mailData = {
      from: "vishal.kondle@gmail.com",
      to: req.body.email,
      subject: "Active your account",
      html: `<!DOCTYPE html><html><title>W3.CSS</title><meta name="viewport" content="width=device-width,initial-scale=1"><body><div style="text-align:center!important;padding:.01em 16px"><h1>Verify Your Account</h1><h5>Please click below button to verify/activate your account.</h5><a href="http://localhost:3000/verify/${find._id}" target="_blank"><button style="color:#fff!important;background-color:#4caf50!important;border:none;display:inline-block;padding:8px 16px;vertical-align:middle;overflow:hidden;text-decoration:none;color:inherit;background-color:inherit;text-align:center;cursor:pointer;white-space:nowrap">Click Here</button></a></div></body></html>`,
    };
    sendMail(mailData);
    return res.status(201).json({
      message: `User created successfully, Please check activation email.`,
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
  if (!isEmailRegistered.active) {
    const mailData = {
      from: "vishal.kondle@gmail.com",
      to: isEmailRegistered.email,
      subject: "Active your account",
      html: `<!DOCTYPE html><html><title>W3.CSS</title><meta name="viewport" content="width=device-width,initial-scale=1"><body><div style="text-align:center!important;padding:.01em 16px"><h1>Verify Your Account</h1><h5>Please click below button to verify/activate your account.</h5><a href="http://localhost:3000/verify/${isEmailRegistered._id}" target="_blank"><button style="color:#fff!important;background-color:#4caf50!important;border:none;display:inline-block;padding:8px 16px;vertical-align:middle;overflow:hidden;text-decoration:none;color:inherit;background-color:inherit;text-align:center;cursor:pointer;white-space:nowrap">Click Here</button></a></div></body></html>`,
    };
    sendMail(mailData);
    return res.status(403).json({
      message:
        "Please activate your account by clicking on link sent to your email.",
    });
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
  return res.status(200).json(user);
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

exports.activate = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid request, please check your email." });
    }
    await User.findByIdAndUpdate(req.body._id, { active: true }, { new: true });
    return res
      .status(200)
      .json({ message: "You are account is activated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while activating your account." });
  }
};
