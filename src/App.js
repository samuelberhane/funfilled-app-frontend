import React from "react";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import { Navigate } from "react-router-dom";
import { useGlobalUserContext } from "./hook/globalUserContext";

const App = () => {
  const { user } = useGlobalUserContext();
  return (
    <main className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
