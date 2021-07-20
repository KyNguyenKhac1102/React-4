import { Container, Form, Alert, Button } from "react-bootstrap";
import React from "react";
import { Formik } from "formik";

const Register = () => {
  const handleValidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.username) {
      errors.username = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
    ) {
      errors.username = "Invalid username format";
    } else if (values.username.length < 4) {
      errors.username = "Must be more than 4 characters";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be at least 8 characters";
    }

    if (!values.rePassword) {
      errors.rePassword = "Required";
    } else if (!(values.rePassword === values.password)) {
      errors.rePassword = "Must be the same password you type";
    }

    if (!values.isAgree) {
      errors.isAgree = "You must agree to the term";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        gender: "",
        password: "",
        rePassword: "",
        isAgree: false,
      }}
      validate={handleValidate}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      {({ values, errors, handleChange, handleSubmit, handleBlur }) => (
        <Container
          style={{ maxWidth: 500, height: 700, marginTop: 10, padding: 20 }}
          className="border"
        >
          <Form onSubmit={handleSubmit}>
            <Alert
              style={{ height: 60, fontSize: "x-large", fontWeight: 500 }}
              className="text-center border-bottom"
            >
              Register
            </Alert>
            <Form.Group controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Username"
              ></Form.Control>
            </Form.Group>
            <Form.Text className="text-danger">{errors.username}</Form.Text>
            <Form.Group className="mt-2 mb-2" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Email"
              ></Form.Control>
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>
            <Form.Group className="mt-2 mb-2" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                as="select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
              <Form.Text className="text-danger">{errors.gender}</Form.Text>
            </Form.Group>
            <Form.Group className="mt-2 mb-2" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Password"
              ></Form.Control>
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            </Form.Group>
            <Form.Group className="mt-2 mb-2" controlId="formRetypePassword">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                name="rePassword"
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Retype Password"
              ></Form.Control>
              <Form.Text className="text-danger">{errors.rePassword}</Form.Text>
            </Form.Group>
            <Form.Group className="mt-2 mb-3" controlId="isAgree">
              <Form.Check
                name="isAgree"
                onChange={handleChange}
                required
                label="Agree to terms and conditions"
              />
              <Form.Text className="text-danger">{errors.isAgree}</Form.Text>
            </Form.Group>
            <Button style={{ width: 460 }} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default Register;
