import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginBusiness, getBusinesses } from "../redux/businessReducer";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const { showIncorrectCredentialsError } = useSelector(
    (state) => state.businesses
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getBusinesses());
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (email && password) {
      const credentials = {
        email: email,
        password: password,
      };
      dispatch(loginBusiness(credentials));
    }
  };

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submit}>
        <h1 className="heaading">Login</h1>

        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Email id
          </label>
          <input
            type="text"
            id="firstname"
            className="username-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="username-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          {showIncorrectCredentialsError && (
            <p className="error-message">Incorrect Credentials</p>
          )}
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {/* {showSubmitError && <p className="error-message">*{errorMsg}</p>} */}
        <div className="signup-button-box">
          <p className="sign-message">
            Don't have an account!,{" "}
            <button onClick={() => navigate("/signup")} className=" signup-btn">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
