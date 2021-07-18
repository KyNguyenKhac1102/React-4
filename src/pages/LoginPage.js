import axios from "axios";
import React, { useEffect, useState } from "react";

const Login = ({
  checkValidate,
  isLoading,
  setIsLoading,
  isValidated,
  setIsValidated,
  emailValidated,
  pwdValidated,
  token,
  setToken,
}) => {
  useEffect(() => {
    emailValidated && pwdValidated
      ? setIsValidated(true)
      : setIsValidated(false);
  }, [emailValidated, pwdValidated]);

  useEffect(() => {
    if (isValidated) {
      axios
        .get("https://60dff0ba6b689e001788c858.mockapi.io/token")
        .then((respone) => {
          console.log(respone.data.token);
          setToken({
            id: respone.data.userId,
            token: respone.data.token,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isValidated]);

  return (
    <React.Fragment>
      <form
        style={{ padding: 20 }}
        onSubmit={(ev) => {
          ev.preventDefault();

          checkValidate(ev.target[0].value, ev.target[1].value);
        }}
      >
        <div style={{ width: 30 + "vw" }} className="form-group ">
          <input className="form-control" placeholder="Enter email"></input>

          {!emailValidated ? (
            <small className="form-text  text-danger">
              Must be valid email
            </small>
          ) : (
            ""
          )}
        </div>
        <div style={{ width: 30 + "vw" }} className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          ></input>
          {!pwdValidated ? (
            <small className="form-text  text-danger">
              Must be more than 8 character
            </small>
          ) : (
            ""
          )}
        </div>
        <input disabled={isLoading ? true : false} type="submit"></input>
      </form>
      {isValidated ? (
        <div style={{ color: "green" }}>Success</div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default Login;
