import {
  ActionIcon,
  Grid,
  Group,
  Paper,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconPhoto, IconSettings, IconTrashFilled } from "@tabler/icons-react";
import React from "react";

const GroupInfo = () => {
  const theme = useMantineTheme();

  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Grid>
        <Grid.Col span={2}>
          <ThemeIcon radius="xl" size={"xl"}>
            <IconPhoto />
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={700}>{"Trip"}</Text>
          <Text>Created by {"You"}</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group position="right">
            <ActionIcon
              color={theme.primaryColor}
              radius="xl"
              variant="outline"
            >
              <IconSettings size="1.125rem" />
            </ActionIcon>
            <ActionIcon
              color={theme.primaryColor}
              radius="xl"
              variant="outline"
            >
              <IconTrashFilled size="1.125rem" />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default GroupInfo;
