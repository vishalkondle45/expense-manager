const Group = require("../models/Group");
const User = require("../models/User");

exports.newGroup = async (req, res, next) => {
  // return res.status(201).send(req._id);
  const group = new Group({
    ...req.body,
    members: [req._id],
    createdBy: req._id,
  });

  try {
    await group.save();
    return res.status(201).json({
      message: `Group created successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.myGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({ members: { $in: [req._id] } });
    return res.status(201).json({
      groups,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.getGroup = async (req, res, next) => {
  try {
    const group = await Group.findOne({
      members: { $in: [req._id] },
      _id: req.params.groupId,
    });
    const users = await User.find({ _id: { $in: group.members } }).select(
      "name mobile"
    );
    if (group && users) {
      return res.status(201).json({ group, users });
    } else {
      return res.status(404).json({ message: "Invalid Group" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};
