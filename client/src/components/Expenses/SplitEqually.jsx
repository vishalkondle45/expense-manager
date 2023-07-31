import { Box, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SplitEqually = ({ form }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);

  // useEffect(() => {
  //   form.setFieldValue(
  //     "splitAmong",
  //     groupUsers.map(({ _id }) => {
  //       return {
  //         _id,
  //         amount: Number(form.values.price) / groupUsers.length,
  //       };
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.values.price]);

  useEffect(() => {
    const splitTrueCount = form.values.splitAmong.filter(
      (user) => user.split === true
    ).length;
    form.setFieldValue(
      "splitAmong",
      form.values.splitAmong.map((user) => {
        if (user.split) {
          return {
            _id: user._id,
            amount: Number(form.values.price) / splitTrueCount,
            split: true,
          };
        }
        return user;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.price]);

  const toggleIt = (_id) => {
    let splitAmong = form.values.splitAmong;
    let xyz = splitAmong.map((user) => {
      if (user._id === _id) {
        return { ...user, split: !user.split, amount: 0 };
      }
      return user;
    });
    let { length } = xyz.filter((user) => user.split === true);

    form.setFieldValue(
      "splitAmong",
      xyz.map((user) => {
        if (user.split) {
          return {
            ...user,
            amount: form.values.price / length,
          };
        }
        return user;
      })
    );
  };

  const theme = useMantineTheme();

  return (
    <>
      {JSON.stringify(form.values.splitAmong)}
      <Group
        position="left"
        style={{ textAlign: "center", overflowX: "auto" }}
        spacing="xs"
        noWrap
        pb="xs"
      >
        {form.values.splitAmong.map((u) => (
          <Paper
            px="md"
            withBorder
            style={{ cursor: "pointer" }}
            key={u._id}
            bg={u.split ? theme.primaryColor : ""}
            c={u.split ? "white" : ""}
            onClick={() => toggleIt(u._id)}
          >
            <Box w={60}>
              <Text title={u._id} truncate>
                {groupUsers.find((user) => user._id === u._id).name}
              </Text>
            </Box>
            <Text fw={700}>₹ {u.amount.toFixed(2)}</Text>
          </Paper>
        ))}
      </Group>
    </>
  );
};

export default SplitEqually;
