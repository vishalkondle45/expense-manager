import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconX } from "@tabler/icons-react";

const Signup = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 6 ? null : "Password must be minimum 6 characters",
      mobile: (value) =>
        value.length === 10
          ? null
          : "Mobile number must be minimum 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    await axios
      .post("http://localhost:5000/api/signup", values)
      .then(({ data }) => {
        console.log(data);
        notifications.show({
          color: "green",
          icon: <IconCheck />,
          message: data.message,
        });
        navigate("/login");
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
    <Box maw={300} mx="auto">
      <Title align="center" order={1}>
        Signup
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="John Doe"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Mobile Number"
          placeholder="9876543210"
          maxLength={10}
          {...form.getInputProps("mobile")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Signup;
