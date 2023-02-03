import React from "react";
import Form from "./Form/Form";
import Posts from "./Posts/Posts";

const Homepage = () => {
  return (
    <div className="container">
      <section className="home">
        <div className="form-container">
          <Form />
        </div>
        <Posts />
      </section>
    </div>
  );
};

export default Homepage;
