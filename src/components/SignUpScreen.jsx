import React, { useEffect, useState } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { addBusiness, getBusinesses } from "../redux/businessReducer";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const { showLocationError } = useSelector((state) => state.businesses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [emailname, setEmailName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getBusinesses());
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setShowError(true);
      return;
    }
    if (name && businessName && locationName && emailname && password) {
      const newObj = {
        firstName: name,
        lastName: lastName,
        businessName: businessName,
        location: locationName,
        email: emailname,
        password: password,
      };
      dispatch(addBusiness(newObj));
    }
  };

  return (
    <div className="login-form-container">
      <form className="form-container signup-form" onSubmit={submit}>
        <h1 className="heading">SignUp Page</h1>

        <div className="input-container">
          <label className="input-label" htmlFor="username">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            className="username-input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            className="username-input-field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Business Name
          </label>
          <input
            type="text"
            id="businessname"
            className="username-input-field"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="username-input-field"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Location"
          />
          {showLocationError && (
            <p className="error-message">
              Same Business name is already taken at this Location
            </p>
          )}
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Email Id
          </label>
          <input
            type="text"
            id="emailId"
            className="username-input-field"
            value={emailname}
            onChange={(e) => setEmailName(e.target.value)}
            placeholder="Email Id"
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
            placeholder="Password"
            onFocus={() => setShowError(false)}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="username-input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            onFocus={() => setShowError(false)}
          />
          {showError && <p className="error-message">Password doesn't match</p>}
        </div>
        <button type="submit" className="login-button">
          Sign Up
        </button>
        {/* {showSubmitError && <p className="error-message">*{errorMsg}</p>} */}
        <div className="signup-button-box">
          <p className="sign-message">
            Already have an account!,{" "}
            <button onClick={() => navigate("/login")} className=" signup-btn">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
