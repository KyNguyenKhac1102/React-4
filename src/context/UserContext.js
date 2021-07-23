import { createContext } from "react";

const UserContext = createContext({
  id: null,
  token: null,
});

export default UserContext;
