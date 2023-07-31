import { Accordion } from "@mantine/core";
import React from "react";
import UserSpending from "./UserSpending";

const OthersSpending = () => {
  return (
    <>
      <Accordion mt={"lg"} radius="xs" variant="separated" defaultValue="">
        <Accordion.Item value="others">
          <Accordion.Control>Others Spending Summary</Accordion.Control>
          <Accordion.Panel>
            <UserSpending
              title="Amamma"
              color="orange"
              amounts={[0, 475, 0, 0, 475.0]}
            />
            <UserSpending
              title="Amma"
              color="orange"
              amounts={[0, 225, 0, 0, 225.0]}
            />
            <UserSpending
              title="Abhi"
              color="orange"
              amounts={[0, 125, 0, 0, 125.0]}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default OthersSpending;
