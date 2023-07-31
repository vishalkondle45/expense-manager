import { Box, Checkbox, Group, Text, TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SplitUnequally = ({ form }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);

  // useEffect(() => {
  //   form.setFieldValue(
  //     "splitAmong",
  //     groupUsers.map(({ _id }) => {
  //       return {
  //         _id,
  //         amount: Number(form.values.price) / groupUsers.length,
  //       };
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.values.price]);

  return (
    <Box>
      {groupUsers.map(({ _id, name }) => (
        <Group position="apart" key={_id}>
          <Checkbox
            value={_id}
            label={name}
            checked={
              form.values.splitAmong.find(({ _id: id }) => id === _id)
                ? true
                : false
            }
            onChange={(e) => {
              const { splitAmong } = form.values;
              if (splitAmong.find(({ _id: id }) => id === _id)) {
                form.setFieldValue(
                  "splitAmong",
                  splitAmong.filter(({ _id: id }) => id !== _id)
                );
              } else {
                form.setFieldValue("splitAmong", [
                  ...splitAmong,
                  { _id: _id, amount: 0 },
                ]);
              }
            }}
          />
          <TextInput
            size="xs"
            type="number"
            min={0}
            max={form.values.price}
            style={{
              width: "50%",
            }}
            value={
              form.values.splitAmong.find(({ _id: id }) => id === _id)
                ?.amount || ""
            }
            onChange={(e) => {
              let objIndex = form.values.splitAmong.findIndex(
                (obj) => obj._id === _id
              );
              let arr = form.values.splitAmong;
              arr[objIndex].amount = Number(e.target.value);
              if (form.values.price >= Number(e.target.value)) {
                form.setFieldValue("splitAmong", arr);
              }
            }}
            onClick={(e) => {
              let objIndex = form.values.splitAmong.findIndex(
                (obj) => obj._id === _id
              );
              let arr = form.values.splitAmong;
              arr[objIndex].amount = 0;
              form.setFieldValue("splitAmong", arr);
            }}
            disabled={!form.values.splitAmong.find(({ _id: id }) => id === _id)}
            placeholder="Enter price"
          />
        </Group>
      ))}
      <Group position="apart">
        <Group position="left" style={{ gap: "0.3rem" }}>
          <Text fz="sm">People :</Text>
          <Text fz="sm" fw={700}>
            {form.values.splitAmong.length} / {groupUsers.length}
          </Text>
        </Group>
        <Group position="left" style={{ gap: "0.3rem" }}>
          <Text fz="sm">Remaining :</Text>
          <Text
            fz="sm"
            fw={700}
            color={
              form.values.price -
                form.values.splitAmong.reduce((accumulator, object) => {
                  return accumulator + (Number(object?.amount) || 0);
                }, 0) <
              0
                ? "red"
                : "green"
            }
          >
            {(
              form.values.price -
              form.values.splitAmong.reduce((accumulator, object) => {
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

export default SplitUnequally;
