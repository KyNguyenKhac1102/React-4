import React from "react";
import { useState, useEffect } from "react";
import Profile from "../pages/ProfilePage";
import Login from "../pages/LoginPage";
import Posts from "../pages/PostPage";
import Home from "../pages/HomePage";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const [emailValidated, setEmailValidated] = useState(false);
  const [pwdValidated, setPwdValidated] = useState(false);

  const [token, setToken] = useState({
    id: null,
    token: null,
  });

  const [profile, setProfile] = useState({
    id: "",
    name: "",
  });

  const checkValidate = (email, pwd) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(String(email).toLowerCase())
      ? setEmailValidated(true)
      : setEmailValidated(false);

    pwd.length >= 8 ? setPwdValidated(true) : setPwdValidated(false);
  };

  const handleOnClickLogOut = () => {
    setIsValidated(false);
  };

  return (
    <Router>
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item m-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item m-2">
                  <Link to="/Posts">Posts</Link>
                </li>
                <li className="nav-item m-2">
                  <Link to="/Profile">Profile</Link>
                </li>
                <li className="nav-item m-2">
                  {isValidated ? (
                    <button onClick={handleOnClickLogOut}>Log out</button>
                  ) : (
                    <Link to="/Login">Login</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/Posts">
            <Posts />
          </Route>
          <Route path="/Profile">
            <Profile
              checkValidate={checkValidate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              emailValidated={emailValidated}
              pwdValidated={pwdValidated}
              setToken={setToken}
              profile={profile}
              setProfile={setProfile}
            />
          </Route>
          <Route path="/Login">
            <Login
              checkValidate={checkValidate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              emailValidated={emailValidated}
              pwdValidated={pwdValidated}
              setToken={setToken}
            />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default Navbar;
