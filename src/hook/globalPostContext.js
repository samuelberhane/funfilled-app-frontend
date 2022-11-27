import { useContext } from "react";
import { PostContext } from "../context/postContext";

export const useGlobalPostContext = () => {
  return useContext(PostContext);
};
