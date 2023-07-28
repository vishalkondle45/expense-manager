import {
  ActionIcon,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import {
  IconCar,
  IconDots,
  IconHome,
  IconScriptPlus,
  IconSettings,
  IconTrashFilled,
  IconUserPlus,
} from "@tabler/icons-react";
import React from "react";
import NewExpense from "../Expenses/NewExpense";
import { useSelector } from "react-redux";
import { IconBuilding } from "@tabler/icons-react";
import { IconShirtSport } from "@tabler/icons-react";

const GroupInfo = () => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();

  const [addUser, { open, close }] = useDisclosure(false);
  const group = useSelector((state) => state.group);
  const { groupUsers } = useSelector((state) => state.groupUsers);

  const getUserNameById = (_id) => {
    return groupUsers.find((member) => member._id === group?.createdBy).name;
  };

  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Grid>
        <Grid.Col span={2}>
          <ThemeIcon radius="xl" size={"xl"}>
            {group.type === "Home" && <IconHome />}
            {group.type === "Trip" && <IconCar />}
            {group.type === "Office" && <IconBuilding />}
            {group.type === "Sports" && <IconShirtSport />}
            {group.type === "Others" && <IconDots />}
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={700}>{group.name}</Text>
          <Text fz={width > 520 ? "md" : "xs"}>
            {groupUsers.length > 0 &&
              group?.createdBy &&
              "Created by " + getUserNameById(group?.createdBy)}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          {width > 520 ? (
            <Group position="right" spacing="xs">
              <ActionIcon
                title="Settings"
                color={theme.primaryColor}
                radius="xl"
                variant="outline"
              >
                <IconSettings size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                title="Delete"
                color={theme.primaryColor}
                radius="xl"
                variant="outline"
              >
                <IconTrashFilled size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                title="Add a member"
                color={theme.primaryColor}
                radius="xl"
                // onClick={open}
                variant="filled"
              >
                <IconUserPlus size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                title="Add an expense"
                color={theme.primaryColor}
                radius="xl"
                variant="filled"
                onClick={open}
              >
                <IconScriptPlus size="1.125rem" />
              </ActionIcon>
            </Group>
          ) : (
            <>
              <Group position="right" spacing="xs">
                <ActionIcon
                  title="Settings"
                  color={theme.primaryColor}
                  radius="xl"
                  variant="outline"
                  size="sm"
                >
                  <IconSettings size="1.125rem" />
                </ActionIcon>
                <ActionIcon
                  title="Delete"
                  color={theme.primaryColor}
                  radius="xl"
                  variant="outline"
                  size="sm"
                >
                  <IconTrashFilled size="1.125rem" />
                </ActionIcon>
              </Group>
              <Group position="right" mt="xs" spacing="xs">
                <ActionIcon
                  title="Add a member"
                  color={theme.primaryColor}
                  radius="xl"
                  variant="filled"
                  size="sm"
                  // onClick={open}
                >
                  <IconUserPlus size="1.125rem" />
                </ActionIcon>
                <ActionIcon
                  title="Add an expense"
                  color={theme.primaryColor}
                  radius="xl"
                  variant="filled"
                  size="sm"
                  onClick={open}
                >
                  <IconScriptPlus size="1.125rem" />
                </ActionIcon>
              </Group>
            </>
          )}
        </Grid.Col>
      </Grid>

      <Modal opened={addUser} onClose={close} size="xl" withCloseButton={false}>
        <NewExpense close={close} />
      </Modal>
    </Paper>
  );
};

export default GroupInfo;
