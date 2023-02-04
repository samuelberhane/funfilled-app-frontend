import React from "react";
import { useState } from "react";
import { useGlobalUserContext } from "../../hook/globalUserContext";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Signup = () => {
  const { dispatch } = useGlobalUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [signup, setSignup] = useState(true);
  const [emptyFields, setEmptyFields] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { firstname, lastname, email, password, repeatPassword } = userData;

    const response = await fetch(
      signup
        ? `${process.env.REACT_APP_BACKEND_URL}/user/signup`
        : `${process.env.REACT_APP_BACKEND_URL}/user/login`,
      {
        method: "POST",
        body: signup
          ? JSON.stringify({
              firstname,
              lastname,
              email,
              password,
              repeatPassword,
            })
          : JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("FunfilledUser", JSON.stringify(json));
      setError(null);
      navigate("/");
    }
  };

  const handleChange = () => {
    setSignup(!signup);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="user-logo">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
      </div>

      <h3>{signup ? "Signup" : "Login"}</h3>
      {signup && (
        <>
          <div className="form-group">
            <label htmlFor="firstname">First Name: </label>
            <input
              className={`${emptyFields?.includes("firstname") && "error"}`}
              type="text"
              id="firstname"
              value={userData.firstname}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              id="lastname"
              className={`${emptyFields?.includes("lastname") && "error"}`}
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </div>
        </>
      )}
      <div className="form-group">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          className={`${emptyFields?.includes("email") && "error"}`}
          id="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password: </label>
        <input
          className={`${
            emptyFields?.includes("password") ? "error password" : "password"
          }`}
          type={`${passwordVisible ? "text" : "password"}`}
          id="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <div
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="password-icon"
        >
          {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
        </div>
      </div>
      {signup && (
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password: </label>
          <input
            className={`${
              emptyFields?.includes("repeatPassword")
                ? "error password"
                : "password"
            }`}
            type={`${repeatPasswordVisible ? "text" : "password"}`}
            id="repeatPassword"
            value={userData.repeatPassword}
            onChange={(e) =>
              setUserData({ ...userData, repeatPassword: e.target.value })
            }
          />
          <div
            onClick={() => setRepeatPasswordVisible((prev) => !prev)}
            className="password-icon"
          >
            {repeatPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
          </div>
        </div>
      )}
      <button type="submit" className="signup-btn">
        {signup ? "Signup" : "Login"}
      </button>
      <p type="button" onClick={handleChange} className="change">
        {signup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </p>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
};

export default Signup;
