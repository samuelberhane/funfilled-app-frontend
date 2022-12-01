import React, { useEffect } from "react";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { useGlobalUserContext } from "../../hook/globalUserContext";

const Navbar = () => {
  const { user, dispatch } = useGlobalUserContext();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("FunfilledUser");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
  }, [user]);

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logos">
            <img src={logo} alt="logo" className="logo-img" />
            <Link to="/">
              <h1 className="nav-logo">FunFilled</h1>
            </Link>
          </div>
          <div className="nav-links">
            {user ? (
              <ul className="links">
                <p className="user-name">{`${user.user.firstname} ${user.user.lastname}`}</p>
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </ul>
            ) : (
              <ul className="links">
                <Link to="/signup" className="signup">
                  Signup
                </Link>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
