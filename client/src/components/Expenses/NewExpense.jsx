import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { Box, Center, Text, Title } from "@mantine/core";
import { IconUserCircle, IconUsersGroup } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import ExpenseDetails from "./ExpenseDetails";
import Tabs from "./Tabs";
import SinglePayer from "./SinglePayer";
import MultiPayer from "./MultiPayer";
import SplitEqually from "./SplitEqually";
import SplitUnequally from "./SplitUnequally";
import SplitByShares from "./SplitByShares";
import Buttons from "./Buttons";
axios.defaults.withCredentials = true;

const NewExpense = ({ close }) => {
  const group = useSelector((state) => state.group);
  const user = useSelector((state) => state.user);

  const [value, setValue] = useState("Single Payer");
  const [value1, setValue1] = useState("Equally");

  const form = useForm({
    initialValues: {
      group: group._id,
      description: "",
      date: new Date(),
      price: "",
      paidBy: [],
      splitAmong: [],
    },
    validate: {
      description: (value) => (value ? null : "Please enter description"),
      price: (value) => (value > 0 ? null : "Please enter description"),
      paidBy: (value, values) =>
        values.price ==
        value.reduce((accumulator, object) => {
          return accumulator + (Number(object?.amount) || 0);
        }, 0)
          ? null
          : "Please correct the total.",
      splitAmong: (value, values) =>
        values.price ==
        value.reduce((accumulator, object) => {
          return accumulator + (Number(object?.amount) || 0);
        }, 0)
          ? null
          : "Please correct the total.",
    },
  });

  // Single Payer
  useEffect(() => {
    if (value === "Single Payer") {
      form.setFieldValue("paidBy", [
        {
          _id: user._id,
          amount: Number(form.values.price),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.price, value]);

  const createGroup = async (values) => {
    console.log(values);
  };
  const payerTypeData = [
    {
      value: "Single Payer",
      label: (
        <Center>
          <IconUserCircle size="1rem" />
          <Box ml={10}>Single Payer</Box>
        </Center>
      ),
    },
    {
      value: "Multi Payer",
      label: (
        <Center>
          <IconUsersGroup size="1rem" />
          <Box ml={10}>Multi Payer</Box>
        </Center>
      ),
    },
  ];

  return (
    <>
      <Title align="left" order={4}>
        Create a group
      </Title>
      <form onSubmit={form.onSubmit((values) => createGroup(values))}>
        <ExpenseDetails form={form} />
        <Tabs
          title="Payer"
          data={payerTypeData}
          value={value}
          setValue={setValue}
        />
        {form.errors.paidBy}
        {value === "Single Payer" ? (
          <SinglePayer form={form} />
        ) : (
          <MultiPayer form={form} />
        )}
        <Tabs
          title="Split"
          value={value1}
          setValue={setValue1}
          data={["Equally", "Unequally", "By Shares"]}
        />
        <Text color="#fa5252" fz={"0.875rem"}>
          {form.errors.splitAmong}
        </Text>
        <Text mt="sm" fz="sm" fw={500} color="#212529">
          Split Among
        </Text>
        {value1 === "Equally" && <SplitEqually form={form} />}
        {value1 === "Unequally" && <SplitUnequally form={form} />}
        {value1 === "By Shares" && <SplitByShares form={form} />}
        <Buttons close={close} />
      </form>
    </>
  );
};

export default NewExpense;
