import {
  Container,
  ScrollArea,
  SegmentedControl,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import GroupInfo from "../components/Group/GroupInfo";
import Welcome from "../components/Welcome";
import Expenses from "../components/Expenses/Expenses";
import Balance from "../components/Balance/Balance";
import { useViewportSize } from "@mantine/hooks";
import Summary from "../components/Summary/Summary";
const Group1 = () => {
  const [value, setValue] = useState("Summary");
  const { height } = useViewportSize();
  const theme = useMantineTheme();

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Container size="xs">
      <Welcome />
      <GroupInfo />
      <SegmentedControl
        fullWidth
        my="lg"
        color={theme.primaryColor}
        transitionDuration={500}
        transitionTimingFunction="linear"
        data={["Expense", "Balance", "Summary"]}
        value={value}
        onChange={setValue}
      />
      <ScrollArea pb={"sm"} h={height - 270}>
        {value === "Expense" && <Expenses />}
        {value === "Balance" && <Balance />}
        {value === "Summary" && <Summary />}
      </ScrollArea>
    </Container>
  );
};

export default Group1;
