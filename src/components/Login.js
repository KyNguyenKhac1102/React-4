import { Container, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import React from "react";

const Login = ({ setToken, setIsLogin }) => {
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

        axios
          .get("https://60dff0ba6b689e001788c858.mockapi.io/token")
          .then((response) => {
            setToken({
              userId: response.data.userId,
              token: response.data.token,
            });
          })
          .catch((error) => {
            console.log(error);
          });

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
              className="mt-2"
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
};

export default Login;
