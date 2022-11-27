import React, { useReducer } from "react";
import { postReducer } from "../reducers/postReducer";

const initialState = {
  posts: null,
  currentId: null,
};

const PostContext = React.createContext();
const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostContextProvider };
