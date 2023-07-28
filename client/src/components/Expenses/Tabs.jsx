import { SegmentedControl, Text, useMantineTheme } from "@mantine/core";
import React from "react";

const Tabs = ({ title, value, setValue, data }) => {
  const theme = useMantineTheme();
  return (
    <div>
      <Text mt="sm" fz="sm" fw={500} color="#212529">
        {title}
      </Text>
      <SegmentedControl
        fullWidth
        value={value}
        onChange={setValue}
        // data={["Single Payer", "Multi Payer"]}
        data={data}
        style={{
          marginBottom: "0.3rem",
        }}
        color={theme.primaryColor}
      />
    </div>
  );
};

export default Tabs;
