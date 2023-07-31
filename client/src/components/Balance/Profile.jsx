import { Avatar, Center, Text } from "@mantine/core";
import React from "react";

const Profile = () => {
  return (
    <>
      <Center>
        <Avatar
          align="center"
          radius="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
      </Center>
      <Text align="center" fw="bold" fz="xs">
        Abhi
      </Text>
      <Text align="center" fz="xs">
        7276718848
      </Text>
    </>
  );
};

export default Profile;
