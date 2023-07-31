import { Button, Container, Group, SimpleGrid, Title } from "@mantine/core";
import React from "react";
import GroupItem from "./GroupItem";
import { IconCirclePlus } from "@tabler/icons-react";

const GroupList = ({ groups, open }) => {
  return (
    <Container>
      <Group position="apart">
        <Title order={1}>Groups</Title>
        <Button onClick={open} leftIcon={<IconCirclePlus />}>
          Create a group
        </Button>
      </Group>
      <SimpleGrid
        cols={2}
        spacing="lg"
        mt={"xl"}
        breakpoints={[
          { maxWidth: "xl", cols: 2, spacing: "md" },
          { maxWidth: "lg", cols: 2, spacing: "md" },
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {groups.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default GroupList;
