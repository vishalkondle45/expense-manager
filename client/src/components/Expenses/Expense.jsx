import { Grid, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";

const Expense = ({ paid, pamount, amount, date, title }) => {
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
            {paid.length === 1 ? paid[0].id : `${paid.length} peoples`} paid ₹
            {pamount}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fz="xs" align="right">
            {dayjs(date).format("MMM DD")}
          </Text>
          <Text align="right" color="green" fw={700}>
            ₹ {amount}
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Expense;
