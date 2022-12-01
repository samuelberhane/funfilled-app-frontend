import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useGlobalUserContext = () => {
  return useContext(UserContext);
};
