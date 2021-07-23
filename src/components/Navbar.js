import { Container, Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import Posts from "./Posts";
import Profile from "./Profile";
import Register from "./Register";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Author from "./Author";

const NavbarHeader = ({ token, setToken, clearToken, isLogin, setIsLogin }) => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="container">
            <Link className="p-2" to="/">
              Home
            </Link>
            <Link className="p-2" to="/Posts">
              Posts
            </Link>
            <Link className="p-2" to="/Profile">
              Profile
            </Link>
            <Link className="p-2" to="/Author">
              Author
            </Link>
            <Container className="d-flex justify-content-end">
              {isLogin ? (
                ""
              ) : (
                <Link className="p-2" to="/Register">
                  Register
                </Link>
              )}

              {isLogin && <Redirect to="/"></Redirect>}

              {!isLogin ? (
                <Link className="p-2" to="/Login">
                  Login
                </Link>
              ) : (
                <Button
                  className="p-2"
                  onClick={() => {
                    setIsLogin(false);
                    clearToken();
                  }}
                >
                  Log out
                </Button>
              )}
            </Container>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/Login">
          <Login setToken={setToken} setIsLogin={setIsLogin}></Login>
        </Route>

        <Route path="/Register">
          <Register></Register>
        </Route>
        <Route path="/Profile">
          <Profile
            token={token}
            setToken={setToken}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          ></Profile>
        </Route>
        <Route path="/Posts">
          <Posts></Posts>
        </Route>
        <Route path="/Author">
          <Author></Author>
        </Route>

        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="*">
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </Router>
  );
};

export default NavbarHeader;
