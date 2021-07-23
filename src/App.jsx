import React from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import UserContext from "./context/UserContext";

const App = () => {
  const [token, setToken] = useState({
    userId: "",
    token: "",
  });

  const [isLogin, setIsLogin] = useState(false);

  return (
    <React.Fragment>
      <UserContext.Provider value={(token, setToken)}>
        <Navbar
          token={token}
          setToken={setToken}
          clearToken={() => {
            sessionStorage.clear();
          }}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        ></Navbar>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
