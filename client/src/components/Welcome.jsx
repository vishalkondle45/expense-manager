import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
axios.defaults.withCredentials = true;

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("http://localhost:5000/api/user", {
          withCredentials: true,
        })
        .then(({ data }) => {
          console.log(data);
          dispatch(authActions.login());
          setUser(data.user);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    getUser();
  }, [navigate, dispatch]);

  return <div>{user && user.name}</div>;
};

export default Welcome;
