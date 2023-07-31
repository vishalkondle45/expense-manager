import { Group, Text } from "@mantine/core";
import React from "react";

const SpendingLine = ({ text, amount }) => {
  return (
    <div>
      <Group position="apart">
        <Text fz="sm">{text}</Text>
        <Text fz="sm">₹ {amount}</Text>
      </Group>
    </div>
  );
};

export default SpendingLine;
