import { Badge, Group } from "@mantine/core";
import React, { useState } from "react";

const Range = () => {
  const [range, setRange] = useState("All Time");
  const ranges = ["All Time", "This Month", "Last Month", "Custom"];
  return (
    <>
      <Group mb={"md"}>
        {ranges.map((item) => (
          <Badge
            size="sm"
            onClick={() => setRange(item)}
            variant={`${range === item ? "filled" : "outline"}`}
            key={item}
          >
            {item}
          </Badge>
        ))}
      </Group>
    </>
  );
};

export default Range;
