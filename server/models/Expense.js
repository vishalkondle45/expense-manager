const mongoose = require("mongoose");

const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    group: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    price: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: Array,
      default: [],
      required: true,
    },
    // split: {
    //   type: String,
    //   enum: ["Equally", "Unequally"],
    //   required: true,
    // },
    splitAmong: {
      type: Array,
      default: [],
      required: true,
    },
    // Bill/Receipt
    // Type
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
