import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import React from "react";
import UserContext from "../context/UserContext";
import Login from "./Login";

const Profile = ({ token, setToken, isLogin, setIsLogin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    createAt: null,
  });

  const fetchData = (token, didCancel) => {
    axios
      .get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${token.userId}`)
      .then((response) => {
        if (!didCancel) {
          setProfileData({
            id: response.data.id,
            name: response.data.name,
            createAt: response.data.createAt,
          });
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let didCancel = false;
    fetchData(token, didCancel);
    return () => (didCancel = true);
  }, [token]);

  if (isLogin) {
    return (
      <Container>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div>
            {" "}
            <div>Id:{profileData.id}</div>
            <div>Name:{profileData.name}</div>
          </div>
        )}
      </Container>
    );
  } else {
    return (
      <div style={{ position: "relative", padding: 20 }}>
        <div
          style={{
            position: "absolute",
            left: 43 + "vw",
            textAlign: "center",
            fontSize: "large",
            fontWeight: 700,
          }}
        >
          You need login to continue
        </div>
        <Login setToken={setToken} setIsLogin={setIsLogin}></Login>
      </div>
    );
  }
};

export default Profile;
