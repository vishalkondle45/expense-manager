import React from "react";
import Expense from "./Expense";
import { useSelector } from "react-redux";

const Expenses = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const { _id } = useSelector((state) => state.user);
  return (
    <>
      {expenses.map((expense) => (
        <Expense
          paid={expense.paidBy}
          pamount={expense.price}
          amount={
            (expense.paidBy.find((user) => user._id === _id)?.amount || 0) -
            expense.splitAmong.find((user) => user._id === _id)?.amount
          }
          date={expense.date}
          title={expense.description}
          key={expense._id}
        />
      ))}
    </>
  );
};

export default Expenses;
