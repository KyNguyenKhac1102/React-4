import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import Posts from "./Posts";
import Profile from "./Profile";
import Register from "./Register";
import { useState } from "react";
import React from "react";

const NavbarHeader = () => {
  const [token, setToken] = useState({
    userId: "",
    token: "",
  });

  const [isLogin, setIsLogin] = useState(false);

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
            <Container className="d-flex justify-content-end">
              <Link className="p-2" to="/Register">
                Register
              </Link>

              {!isLogin ? (
                <Link className="p-2" to="/Login">
                  Login
                </Link>
              ) : (
                <Button
                  className="p-2"
                  onClick={() => {
                    setIsLogin(false);
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
