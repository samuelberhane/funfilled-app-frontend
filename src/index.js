import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostContextProvider } from "./context/postContext";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
