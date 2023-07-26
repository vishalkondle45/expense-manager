import { Badge, Grid, Group, Paper, Text, Title } from "@mantine/core";
import { IconBrandOffice, IconHome } from "@tabler/icons-react";
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
          {type === "Home" ? (
            <IconHome size="2.5rem" />
          ) : (
            <IconBrandOffice size="2.5rem" />
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={5}>{name}</Title>
        </Grid.Col>

        <Grid.Col style={{ alignItems: "end" }} span={4}>
          <Group position="right">
            {type === "Home" ? (
              <Badge color="teal" variant="filled">
                New
              </Badge>
            ) : (
              <Text fz={"xs"}>
                You are owed
                <Text align="right" color="teal" fw="900">
                  ₹530
                </Text>
              </Text>
            )}
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default GroupItem;
