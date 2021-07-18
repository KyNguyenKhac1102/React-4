import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = ({
  checkValidate,
  isLoading,
  setIsLoading,
  isValidated,
  setIsValidated,
  emailValidated,
  pwdValidated,
  profile,
  setProfile,
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
          return axios
            .get(
              "https://60dff0ba6b689e001788c858.mockapi.io/users/" +
                respone.data.userId
            )
            .then((respone) => {
              setProfile({
                id: respone.data.id,
                name: respone.data.name,
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isValidated]);

  if (isValidated) {
    return (
      <div>
        <h2>Profile</h2>
        <div>Name: {profile.id}</div>
        <div>UserId: {profile.name}</div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div style={{ paddingLeft: 20, fontWeight: "bold" }}>
          Login first to go to Profile
        </div>
        <form
          style={{ padding: 20 }}
          onSubmit={(ev) => {
            ev.preventDefault();

            checkValidate(ev.target[0].value, ev.target[1].value);
          }}
        >
          <div style={{ width: 30 + "vw" }} className="form-group ">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            ></input>

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
  }
};

export default Profile;
