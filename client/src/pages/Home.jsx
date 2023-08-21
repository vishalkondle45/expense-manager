import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions, userActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mantine/core";
axios.defaults.withCredentials = true;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("http://localhost:5000/api/user", {
          withCredentials: true,
        })
        .then(({ data }) => {
          // console.log(data);
          dispatch(authActions.login());
          dispatch(userActions.setUser(data));
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    getUser();
  }, [navigate, dispatch]);

  return (
    <Container>
      <h1>Welcome {user.name},</h1>
    </Container>
  );
};

export default Home;
