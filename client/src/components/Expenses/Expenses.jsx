import React from "react";
import Expense from "./Expense";
import { useSelector } from "react-redux";

const Expenses = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  return (
    <>
      {expenses.map((expense) => (
        <Expense
          paid={expense.paidBy}
          pamount={expense.price}
          amount={"375"}
          date={expense.date}
          title={expense.description}
          key={expense._id}
        />
      ))}
    </>
  );
};

export default Expenses;
