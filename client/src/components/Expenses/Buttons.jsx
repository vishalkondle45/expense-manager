import { Button, Group } from "@mantine/core";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import React from "react";

const Buttons = ({ close }) => {
  return (
    <Group position="center">
      <Button
        leftIcon={<IconCircleX />}
        type="reset"
        onClick={close}
        color="red"
      >
        Cancel
      </Button>
      <Button leftIcon={<IconCircleCheck />} type="submit" color="teal">
        Submit
      </Button>
    </Group>
  );
};

export default Buttons;
