import { Box, Checkbox, Group, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const SplitByShares = ({ form }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);
  const [shares, setShare] = useState(
    groupUsers.map(({ _id }) => ({
      _id,
      shares: 0,
    }))
  );

  useEffect(() => {
    form.setFieldValue("splitAmong", []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let abc = form.values.splitAmong.map((user) => {
      return {
        ...user,
        amount:
          ((form.values.price || 0) /
            shares.reduce((accumulator, object) => {
              return accumulator + Number(object.shares);
            }, 0)) *
          shares.find(({ _id: id }) => id === user._id)?.shares,
      };
    });
    form.setFieldValue("splitAmong", abc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.price]);

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
                setShare((share) => share.filter((s) => s._id !== _id));
                form.setFieldValue(
                  "splitAmong",
                  splitAmong.filter(({ _id: id }) => id !== _id)
                );
              } else {
                setShare((shares) => [...shares, { _id, shares: 0 }]);
                form.setFieldValue("splitAmong", [
                  ...splitAmong,
                  { _id: _id, amount: 0 },
                ]);
              }
            }}
          />
          <Text fz="xs">
            ₹{" "}
            {isNaN(
              (
                ((form.values.price || 0) /
                  shares.reduce((accumulator, object) => {
                    return accumulator + Number(object.shares);
                  }, 0)) *
                shares.find(({ _id: id }) => id === _id)?.shares
              ).toFixed(2)
            )
              ? "0"
              : (
                  ((form.values.price || 0) /
                    shares.reduce((accumulator, object) => {
                      return accumulator + Number(object.shares);
                    }, 0)) *
                  shares.find(({ _id: id }) => id === _id)?.shares
                ).toFixed(2)}
          </Text>
          <TextInput
            size="xs"
            type="number"
            min={0}
            max={form.values.price}
            style={{
              width: "50%",
            }}
            value={shares.find(({ _id: id }) => id === _id)?.shares || ""}
            onChange={(e) => {
              const abc = shares.map((s) => {
                if (s._id === _id) {
                  return { ...s, shares: Number(e.target.value) };
                }
                return s;
              });
              setShare((shares) => abc);
              let arr = form.values.splitAmong;
              let shareTotal = abc.reduce((accumulator, object) => {
                return accumulator + Number(object.shares);
              }, 0);

              let xyz = arr.map((user) => {
                return {
                  ...user,
                  amount:
                    ((form.values.price || 0) / shareTotal) *
                    abc.find(({ _id: id }) => id === user._id)?.shares,
                };
              });

              form.setFieldValue("splitAmong", xyz);
            }}
            disabled={!form.values.splitAmong.find(({ _id: id }) => id === _id)}
            placeholder="Enter price"
          />
        </Group>
      ))}
      <Text color="red">{form.errors.splitAmong}</Text>
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

export default SplitByShares;
