import { Button, Center, Container, Loader, Text } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Verify = () => {
  const { userId } = useParams();
  const [loader, setLoader] = useState(0);
  const [message, setMessage] = useState("Account verification processing");
  useEffect(() => {
    const verifyAccount = async () => {
      await axios
        .post(`http://localhost:5000/api/verify`, { _id: userId })
        .then((res) => {
          setMessage(res.data.message);
          setLoader(1);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setLoader(2);
        });
      // .finally(() => {
      //   setLoader(true);
      // });
    };
    verifyAccount();
  }, [userId]);

  return (
    <Container style={{ textAlign: "center" }}>
      <Center maw={800} h={500} mx="auto">
        <div>
          {!loader && <Loader variant="oval" />}
          <Text fw={700} fz={"xl"}>
            {message}
          </Text>
          {loader === 1 && (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
          {loader === 2 && (
            <a href="https://mail.google.com">
              <Button bg={"red"}>Go To GMail</Button>
            </a>
          )}
        </div>
      </Center>
    </Container>
  );
};

export default Verify;
