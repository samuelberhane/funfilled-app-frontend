import React from "react";
import logo from "../../image/logo.png";

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <img src={logo} alt="logo" className="logo-img" />
          <h1 className="nav-logo">FunFilled</h1>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
