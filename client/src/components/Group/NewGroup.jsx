import React from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  SegmentedControl,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconX,
} from "@tabler/icons-react";
axios.defaults.withCredentials = true;

const NewGroup = ({ close, getMyGroups }) => {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      name: "",
      type: "Home",
      simplify: false,
      members: [],
    },

    validate: {
      name: (value) =>
        value.length > 2 ? null : "Name must be minimum 3 characters",
      type: (value) => (value ? null : "Please select group type"),
    },
  });

  const createGroup = async (values) => {
    await axios
      .post("http://localhost:5000/api/group/new", values, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        notifications.show({
          color: "green",
          icon: <IconCheck />,
          message: data.message,
        });
        getMyGroups();
        close();
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      });
  };

  return (
    <>
      <Title align="left" order={4}>
        Create a group
      </Title>
      <form onSubmit={form.onSubmit((values) => createGroup(values))}>
        <TextInput
          label="Group name"
          placeholder="Enter a group name"
          {...form.getInputProps("name")}
        />
        <Text mt="sm" fz="sm" fw={500} color="#212529">
          Type
        </Text>
        <SegmentedControl
          color={theme.primaryColor}
          transitionDuration={500}
          fullWidth
          transitionTimingFunction="linear"
          data={["Home", "Trip", "Office", "Sports", "Others"]}
          {...form.getInputProps("type")}
        />
        <Group position="center" mt="md">
          <Button
            leftIcon={<IconCircleX />}
            type="reset"
            onClick={close}
            color="red"
          >
            Cancel
          </Button>
          <Button leftIcon={<IconCircleCheck />} type="submit" color="teal">
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default NewGroup;
