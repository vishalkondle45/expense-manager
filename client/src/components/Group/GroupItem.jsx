import { Grid, Group, Paper, Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconBuilding,
  IconCar,
  IconDots,
  IconHome,
  IconShirtSport,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const GroupItem = ({ group: { _id, name, type } }) => {
  const navigate = useNavigate();
  const open = () => navigate(`/groups/${_id}`);
  return (
    <Paper
      shadow="xs"
      p="xs"
      withBorder
      style={{ cursor: "pointer" }}
      onClick={open}
    >
      <Grid>
        <Grid.Col span={2}>
          <ThemeIcon radius="xl" size={"xl"}>
            {type === "Home" && <IconHome />}
            {type === "Trip" && <IconCar />}
            {type === "Office" && <IconBuilding />}
            {type === "Sports" && <IconShirtSport />}
            {type === "Others" && <IconDots />}
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={5}>{name}</Title>
          <Text fz="xs" color="dimmed">
            New
          </Text>
        </Grid.Col>

        <Grid.Col style={{ alignItems: "end" }} span={4}>
          <Group position="right">
            <Text fz={"xs"}>
              {type !== "Home" ? (
                "New Group"
              ) : (
                <>
                  You are owed
                  <Text align="right" color="teal" fw="900">
                    ₹530
                  </Text>
                </>
              )}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default GroupItem;
