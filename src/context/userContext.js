import React, { useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
const user = JSON.parse(localStorage.getItem("FunfilledUser"));

const UserContext = React.createContext();

const initialState = {
  user,
  loggedin: user ? true : false,
  errorText: "",
};
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
