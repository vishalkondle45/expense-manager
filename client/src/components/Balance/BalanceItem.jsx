import { Grid, Paper } from "@mantine/core";
import React from "react";
import Profile from "./Profile";
import Arrow from "./Arrow";
import SettleButtons from "./SettleButtons";

const BalanceItem = () => {
  return (
    <>
      <Paper shadow="xl" radius="xs" p="xs" mb="xs" withBorder>
        <Grid>
          <Grid.Col span={3}>
            <Profile />
          </Grid.Col>
          <Grid.Col span={3} style={{ marginInline: 0, paddingInline: 0 }}>
            <Arrow />
          </Grid.Col>
          <Grid.Col span={3}>
            <Profile />
          </Grid.Col>
          <Grid.Col span={3}>
            <SettleButtons />
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default BalanceItem;
