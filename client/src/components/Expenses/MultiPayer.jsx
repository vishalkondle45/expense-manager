import { Box, Checkbox, Group, Text, TextInput } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

const MultiPayer = ({ form }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);

  return (
    <Box>
      {groupUsers.map(({ _id, name }) => (
        <Group position="apart" key={_id}>
          <Checkbox
            value={_id}
            label={name}
            checked={
              form.values.paidBy.find(({ _id: id }) => id === _id)
                ? true
                : false
            }
            onChange={(e) => {
              const { paidBy } = form.values;
              if (paidBy.find(({ _id: id }) => id === _id)) {
                form.setFieldValue(
                  "paidBy",
                  paidBy.filter(({ _id: id }) => id !== _id)
                );
              } else {
                form.setFieldValue("paidBy", [
                  ...paidBy,
                  { _id: _id, amount: 0 },
                ]);
              }
            }}
          />
          <TextInput
            size="xs"
            type="number"
            style={{
              width: "50%",
            }}
            value={
              form.values.paidBy.find(({ _id: id }) => id === _id)?.amount || ""
            }
            onChange={(e) => {
              let objIndex = form.values.paidBy.findIndex(
                (obj) => obj._id === _id
              );
              let arr = form.values.paidBy;
              arr[objIndex].amount = Number(e.target.value);

              if (form.values.price >= Number(e.target.value)) {
                form.setFieldValue("paidBy", arr);
              }
            }}
            disabled={!form.values.paidBy.find(({ _id: id }) => id === _id)}
            placeholder="Enter price"
          />
        </Group>
      ))}
      <Text color="red">{form.errors.paidBy}</Text>
      <Group position="apart">
        <Group position="left" style={{ gap: "0.3rem" }}>
          <Text fz="sm">People :</Text>
          <Text fz="sm" fw={700}>
            {form.values.paidBy.length} / {groupUsers.length}
          </Text>
        </Group>
        <Group position="left" style={{ gap: "0.3rem" }}>
          <Text fz="sm">Remaining :</Text>
          <Text
            fz="sm"
            fw={700}
            color={
              form.values.price -
                form.values.paidBy.reduce((accumulator, object) => {
                  return accumulator + (Number(object?.amount) || 0);
                }, 0) <
              0
                ? "red"
                : "green"
            }
          >
            {(
              form.values.price -
              form.values.paidBy.reduce((accumulator, object) => {
                return accumulator + (Number(object?.amount) || 0);
              }, 0)
            ).toFixed(2)}
          </Text>
          <Text fz="sm" fw={700}>
            / {form.values.price || "0"}
          </Text>
        </Group>
      </Group>
    </Box>
  );
};

export default MultiPayer;
