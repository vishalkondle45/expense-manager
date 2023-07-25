import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const logout = async () => {
      await axios
        .post("http://localhost:5000/api/logout", null, {
          withCredentials: true,
        })
        .then((res) => {
          if (Number(res.status) === 200) {
            dispatch(authActions.logout());
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          navigate("/login");
        });
    };
    logout();
  }, [navigate, dispatch]);

  return <div>Logout</div>;
};

export default Logout;
