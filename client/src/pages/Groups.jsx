import { Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import NewGroup from "../components/Group/NewGroup";
import axios from "axios";
import Welcome from "../components/Welcome";
import GroupList from "../components/Group/GroupList";

const Groups = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [groups, setGroups] = useState([]);
  const getMyGroups = async () => {
    await axios
      .get("http://localhost:5000/api/group/my")
      .then(({ data }) => {
        console.log(data);
        setGroups(data.groups);
      })
      .catch(() => {});
  };
  useEffect(() => {
    getMyGroups();
  }, []);

  return (
    <Box>
      <Welcome />
      <GroupList groups={groups} open={open} />
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <NewGroup close={close} getMyGroups={getMyGroups} />
      </Modal>
    </Box>
  );
};

export default Groups;
