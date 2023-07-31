import { Group, Text } from "@mantine/core";
import React from "react";
import OthersSpending from "./OthersSpending";
import UserSpending from "./UserSpending";
import { useSelector } from "react-redux";

const Spendings = () => {
  const { totalSpends, allSpends, allShares } = useSelector(
    (state) => state.summary
  );
  const { groupUsers } = useSelector((state) => state.groupUsers);
  return (
    <>
      <Group position="apart">
        <Text fw={700}>Total Group Spending</Text>
        <Text fw={700}>₹ {totalSpends}</Text>
      </Group>
      {groupUsers.map((user) => (
        <>
          <UserSpending
            title="Your Spending Summary"
            amounts={[
              allSpends.find((u) => user._id === u._id)?.amount.toFixed(2),
              allShares.find((u) => user._id === u._id)?.amount.toFixed(2),
              0,
              0,
              0,
            ]}
          />
        </>
      ))}
    </>
  );
};

export default Spendings;
