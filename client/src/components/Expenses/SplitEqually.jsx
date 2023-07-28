import { Box, Group, Paper, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SplitEqually = ({ form }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);

  useEffect(() => {
    form.setFieldValue(
      "splitAmong",
      groupUsers.map(({ _id }) => {
        return {
          _id,
          amount: Number(form.values.price) / groupUsers.length,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.price]);

  return (
    <>
      <Group
        position="left"
        style={{ textAlign: "center", overflowX: "auto" }}
        spacing="xs"
        noWrap
        pb="xs"
      >
        {form.values.splitAmong.map((u) => (
          <Paper px="md" withBorder style={{ cursor: "pointer" }} key={u._id}>
            <Box w={60}>
              <Text title={u._id} truncate>
                {groupUsers.find((user) => user._id === u._id).name}
              </Text>
            </Box>
            <Text fw={700}>{u.amount.toFixed(2)}</Text>
          </Paper>
        ))}
      </Group>
    </>
  );
};

export default SplitEqually;
