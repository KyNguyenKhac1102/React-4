import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const Profile = ({ token, setToken, isLogin, setIsLogin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
  });
  const fetchData = (token) => {
    axios
      .get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${token.userId}`)
      .then(function (response) {
        console.log(response);
        setProfileData({
          id: response.data.id,
          name: response.data.name,
        });
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData(token);
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
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Must be more than 8 characters";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          // async call
          axios
            .get("https://60dff0ba6b689e001788c858.mockapi.io/token")
            .then((response) => {
              // handle success
              console.log(response);
              setToken({
                userId: response.data.userId,
                token: response.data.token,
              });
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
          console.log(values);
          setSubmitting(false);
          setIsLogin(true);
        }}
      >
        {({
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Container
            style={{ maxWidth: 400, height: 400, marginTop: 50, padding: 20 }}
            className="border"
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "large",
                fontWeight: 700,
              }}
            >
              You need to login to continue
            </div>
            <Form onSubmit={handleSubmit}>
              <Alert
                style={{ fontSize: "x-large", fontWeight: 600 }}
                className="text-center border-bottom"
              >
                Login
              </Alert>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                ></Form.Control>
              </Form.Group>
              <Form.Text className="text-danger">{errors.email}</Form.Text>
              <Form.Group className="mt-2 mb-2" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter password"
                ></Form.Control>
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              </Form.Group>
              <Button
                style={{ width: 360 }}
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    );
  }
};

export default Profile;
