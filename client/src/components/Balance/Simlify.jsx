import { Group, Paper, Switch, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

const Simlify = () => {
  const [simplify, setSimpify] = useState(null);
  return (
    <>
      <Paper shadow="xl" radius="md" p="md" withBorder>
        <Group position="apart">
          <Text fw={700}>Simply balane is turned off</Text>
          <Switch
            onChange={setSimpify}
            value={simplify}
            size="md"
            thumbIcon={
              simplify ? (
                <IconCheck size="0.8rem" color={"teal"} stroke={3} />
              ) : (
                <IconX size="0.8rem" color={"red"} stroke={3} />
              )
            }
          />
        </Group>
        <Text fz="xs">
          We simplify your balanes in a group to reduce the number of payments.
        </Text>
        <Text fz="xs">It doesn't change anyone's total balance.</Text>
      </Paper>
    </>
  );
};

export default Simlify;
