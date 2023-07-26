import { Box, Center, Text } from "@mantine/core";
import { IconArrowNarrowRight, IconMinus } from "@tabler/icons-react";
import React from "react";

const Arrow = () => {
  return (
    <>
      <Center maw={400} h={80} mx="auto">
        <Box>
          <Text align="center" size="xs" fw="700" color="green">
            ₹ 100
          </Text>
          <IconMinus style={{ marginRight: "-0.6rem" }} />
          <IconMinus style={{ marginRight: "-0.6rem" }} />
          <IconMinus style={{ marginRight: "-0.6rem" }} />
          <IconMinus style={{ marginRight: "-0.6rem" }} />
          <IconArrowNarrowRight />
          <Text align="center" size="xs">
            will pay
          </Text>
        </Box>
      </Center>
    </>
  );
};

export default Arrow;
