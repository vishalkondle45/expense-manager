import { Grid, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const Expense = ({ paid, pamount, amount, date, title }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);
  return (
    <Paper shadow="xs" radius="xs" p="xs" withBorder>
      {/* <Text fz="xs" align="left">Jul 25</Text> */}
      <Grid>
        <Grid.Col span={2}>
          <ThemeIcon radius="xl" size={"xl"}>
            <IconPhoto />
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={7}>
          <Text fw={700}>{title}</Text>
          <Text fz="sm">
            {paid.length === 1
              ? groupUsers.find(({ _id }) => _id === paid[0]._id)?.name
              : `${paid.length} peoples`}{" "}
            paid ₹{pamount}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fz="xs" align="right">
            {dayjs(date).format("MMM DD")}
          </Text>
          <Text
            color={Number(amount) < 0 ? "red" : "green"}
            align="right"
            fw={700}
          >
            ₹ {amount.toFixed(2)}
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Expense;
