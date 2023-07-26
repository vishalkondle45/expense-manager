import { Box, Button, Center } from "@mantine/core";
import { IconBellRinging, IconCoinRupee } from "@tabler/icons-react";
import React from "react";

const SettleButtons = () => {
  return (
    <>
      <Center maw={400} h={80} mx="auto">
        <Box style={{ textAlign: "center" }}>
          <Button
            variant="outline"
            radius="xl"
            size="xs"
            compact
            leftIcon={<IconBellRinging size="1rem" />}
          >
            Remind
          </Button>
          <Button
            radius="xl"
            size="xs"
            leftIcon={<IconCoinRupee size="1rem" />}
            compact
          >
            Settle up
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default SettleButtons;
