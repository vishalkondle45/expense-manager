import React from "react";
import Expense from "./Expense";

const Expenses = () => {
  return (
    <>
      <Expense
        paid={"You"}
        pamount={"500"}
        amount={"375"}
        date={"Jul 25"}
        title={"Water Park"}
      />
      <Expense
        paid={"Abhishek"}
        pamount={"100"}
        amount={"25"}
        date={"Jul 26"}
        title={"Metro Ticket"}
      />
    </>
  );
};

export default Expenses;
