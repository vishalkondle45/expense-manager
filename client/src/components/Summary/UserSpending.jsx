import { Divider, Paper, Text } from "@mantine/core";
import React from "react";
import SpendingLine from "./SpendingLine";
import { useMantineTheme } from "@mantine/core";

const UserSpending = ({ amounts, title, color }) => {
  const theme = useMantineTheme();

  return (
    <>
      <Text fz={"sm"} color={color || theme.primaryColor}>
        {title}
      </Text>
      <Paper shadow="xl" radius="md" p="sm" mb="md" withBorder>
        <SpendingLine text={"Your total spends (A)"} amount={amounts[0]} />
        <Divider my="xs" variant="dashed" />
        <SpendingLine text={"Your total share (B)"} amount={amounts[1]} />
        <Divider my="xs" variant="dashed" />
        <SpendingLine
          text={"Money you paid till now (C)"}
          amount={amounts[2]}
        />
        <Divider my="xs" variant="dashed" />
        <SpendingLine
          text={"Money you received till now (D)"}
          amount={amounts[3]}
        />
        <Divider my="xs" variant="dashed" />
        <SpendingLine
          text={"Balance (A+C)-(B+D)"}
          amount={amounts[0] + amounts[2] - (amounts[1] + amounts[3])}
        />
      </Paper>
    </>
  );
};

export default UserSpending;
