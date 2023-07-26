import { Group, Text } from "@mantine/core";
import React from "react";
import OthersSpending from "./OthersSpending";
import UserSpending from "./UserSpending";

const Spendings = () => {
  return (
    <>
      <Group position="apart">
        <Text fw={700}>Total Group Spending</Text>
        <Text fw={700}>₹ 1300</Text>
      </Group>
      <UserSpending
        title="Your Spending Summary"
        amounts={[1300, 475, 0, 0, 825.0]}
      />
      <OthersSpending />
    </>
  );
};

export default Spendings;
