const Expense = require("../models/Expense");

exports.summaryByGroup = async (req, res, next) => {
  try {
    const totalSum = await Expense.aggregate([
      {
        $group: {
          _id: "$tempId",
          totalValue: {
            $sum: { $sum: "$paidBy.amount" },
          },
        },
      },
    ]);
    const allSpends = await Expense.aggregate([
      {
        $unwind: {
          path: "$paidBy",
        },
      },
      {
        $group: {
          _id: "$paidBy._id",
          amount: { $sum: "$paidBy.amount" },
        },
      },
      // {
      //   $set: {
      //     _id: "$_id",
      //   },
      // },
      // { $unset: ["_id"] },
    ]);
    const allShares = await Expense.aggregate([
      {
        $unwind: {
          path: "$splitAmong",
        },
      },
      {
        $group: {
          _id: "$splitAmong._id",
          amount: { $sum: "$splitAmong.amount" },
        },
      },
      // {
      //   $set: {
      //     _id: "$_id",
      //   },
      // },
      // { $unset: ["_id"] },
    ]);
    return res.status(201).json({ totalSum, allSpends, allShares });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};
