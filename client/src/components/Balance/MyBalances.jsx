import { Text } from "@mantine/core";
import React from "react";
import BalanceItem from "./BalanceItem";

const MyBalances = () => {
  return (
    <div>
      <Text fw={700}>My Balances</Text>
      <BalanceItem />
      <BalanceItem />
      <BalanceItem />
      <BalanceItem />
      <BalanceItem />
      <BalanceItem />
    </div>
  );
};

export default MyBalances;
