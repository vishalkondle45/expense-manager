import { Group, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconCalendar,
  IconCurrencyRupee,
  IconFileDescription,
} from "@tabler/icons-react";
import React from "react";

const ExpenseDetails = ({ form }) => {
  return (
    <>
      <Group position="apart" grow>
        <TextInput
          icon={<IconFileDescription />}
          label="Description"
          placeholder="Add a description"
          {...form.getInputProps("description")}
        />
      </Group>
      <Group position="apart" grow mt="xs">
        <TextInput
          icon={<IconCurrencyRupee />}
          label="Price"
          type="number"
          placeholder="Enter price"
          {...form.getInputProps("price")}
        />
        <DatePickerInput
          label="Expense Date"
          placeholder="Select Date"
          icon={<IconCalendar />}
          {...form.getInputProps("date")}
        />
      </Group>
    </>
  );
};

export default ExpenseDetails;
