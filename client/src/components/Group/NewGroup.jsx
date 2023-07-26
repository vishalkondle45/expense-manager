import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  SegmentedControl,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  //   const [user, setUser] = useState(null);

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

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("http://localhost:5000/api/user", {
          withCredentials: true,
        })
        .then(({ data }) => {
          dispatch(authActions.login());
        })
        .catch((error) => {
          navigate("/login");
        });
    };
    getUser();
  }, [navigate, dispatch]);

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
        <label
          style={{
            marginTop: "10px",
            display: "inline-block",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#212529",
            wordBreak: "break-word",
            cursor: "default",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Type
        </label>
        <SegmentedControl
          color={theme.primaryColor}
          transitionDuration={500}
          fullWidth
          transitionTimingFunction="linear"
          data={["Home", "Trip", "Office", "Sports", "Others"]}
          {...form.getInputProps("type")}
        />

        {/* <Switch
            label="Simplify Balance"
            mt={"lg"}
            // color="teal"
            size="md"
            thumbIcon={
              form.values.simplify ? (
                <IconCheck size="0.8rem" color={"teal"} stroke={3} />
              ) : (
                <IconX size="0.8rem" color={"red"} stroke={3} />
              )
            }
            {...form.getInputProps("simplify")}
          /> */}
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
