import React from "react";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="container">
        <section className="home">
          <Form />
          <Posts />
        </section>
      </div>
    </main>
  );
};

export default App;
