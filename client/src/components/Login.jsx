import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 6 ? null : "Password should minimum 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    await axios
      .post("http://localhost:5000/api/login", values)
      .then(({ data }) => {
        console.log(data);
        notifications.show({
          color: "green",
          icon: <IconCheck />,
          message: data.message,
        });
        dispatch(authActions.login());
        navigate("/");
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
        Login
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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

export default Login;
