const Expense = require("../models/Expense");

exports.newExpense = async (req, res, next) => {
  const expense = new Expense(req.body);

  try {
    await expense.save();
    return res.status(201).json({
      message: `Expense created successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.myExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ group: req.params.groupId });
    return res.status(201).json(expenses);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};
