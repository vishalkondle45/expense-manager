import {
  Container,
  ScrollArea,
  SegmentedControl,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import GroupInfo from "../components/Group/GroupInfo";
import Welcome from "../components/Welcome";
import Expenses from "../components/Expenses/Expenses";
import Balance from "../components/Balance/Balance";
import { useViewportSize } from "@mantine/hooks";
import Summary from "../components/Summary/Summary";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  expenseActions,
  groupActions,
  groupUsersActions,
  summaryActions,
} from "../store";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
const Group1 = () => {
  const [value, setValue] = useState("Expense");
  const { height } = useViewportSize();
  const theme = useMantineTheme();
  const [expenses, setExpenses] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  // const [members, setMembers] = useState([]);

  useEffect(() => {
    const getGroupExpenses = async () => {
      await axios
        .get(`http://localhost:5000/api/expense/${params.groupId}`)
        .then(({ data }) => {
          // console.log(data);
          setExpenses(data);
          dispatch(expenseActions.setExpenses(data));
        })
        .catch((error) => {
          notifications.show({
            title: error.response.data.message || "Internal Server Error",
            icon: <IconX />,
            color: "red",
          });
        });
    };
    const getGroup = async () => {
      await axios
        .get(`http://localhost:5000/api/group/${params.groupId}`)
        .then(({ data }) => {
          dispatch(groupActions.setGroup(data.group));
          dispatch(groupUsersActions.setGroupUsers(data.users));
        })
        .catch((error) => {
          console.log(error);
          notifications.show({
            title: error.response.data.message || "Internal Server Error",
            icon: <IconX />,
            color: "red",
          });
        });
    };
    const getSummary = async () => {
      await axios
        .get(`http://localhost:5000/api/summary/${params.groupId}`)
        .then(({ data }) => {
          dispatch(
            summaryActions.setSummary({
              totalSpends: data.totalSum[0].totalValue,
              allSpends: data.allSpends,
              allShares: data.allShares,
            })
          );
        })
        .catch((error) => {
          console.log(error);
          notifications.show({
            title: error.response.data.message || "Internal Server Error",
            icon: <IconX />,
            color: "red",
          });
        });
    };
    getSummary();
    getGroup();
    getGroupExpenses();
  }, [params.groupId, dispatch]);

  return (
    <Container size="xs">
      <Welcome />
      <GroupInfo />
      <SegmentedControl
        fullWidth
        my="lg"
        color={theme.primaryColor}
        transitionDuration={500}
        transitionTimingFunction="linear"
        data={["Expense", "Balance", "Summary"]}
        value={value}
        onChange={setValue}
      />
      <ScrollArea pb={"sm"} h={height - 300}>
        {value === "Expense" && <Expenses expenses={expenses} />}
        {value === "Balance" && <Balance />}
        {value === "Summary" && <Summary />}
      </ScrollArea>
    </Container>
  );
};

export default Group1;
