const mongoose = require("mongoose");

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Home", "Trip", "Office", "Sports", "Others"],
      default: "Home",
    },
    createdBy: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      default: [],
    },
    simplify: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Group || mongoose.model("Group", groupSchema);

// Users
