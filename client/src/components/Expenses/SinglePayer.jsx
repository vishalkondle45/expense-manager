import { Select } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

const SinglePayer = ({ form }) => {
  const { groupUsers } = useSelector((state) => state.groupUsers);
  return (
    <>
      <Select
        placeholder="Select Payer"
        data={groupUsers.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }))}
        onChange={(data) => {
          form.setFieldValue("paidBy", [
            {
              _id: data,
              amount: Number(form.values.price),
            },
          ]);
        }}
        value={form.values.paidBy[0]?._id}
      />
    </>
  );
};

export default SinglePayer;
