import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions, userActions } from "../store";
import { useDispatch } from "react-redux";
axios.defaults.withCredentials = true;

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return <div></div>;
};

export default Welcome;
