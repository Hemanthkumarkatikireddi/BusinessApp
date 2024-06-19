import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeReducer";
import { useNavigate } from "react-router-dom";

const AddEmpScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.businesses);
  const { showError, isAdded } = useSelector((state) => state.employees);

  useEffect(() => {
    if (isAdded) {
      navigate("/");
    }
  }, [isAdded]);

  const submit = (event) => {
    event.preventDefault();
    if (name && lastName && role) {
      const employee = {
        firstName: name,
        lastName: lastName,
        role: role,
        businessId: loggedInUser?.id,
      };
      dispatch(addEmployee(employee));
    }
  };

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submit}>
        <h1 className="heaading">Add Employee</h1>
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
            Employee Role
          </label>
          <input
            type="text"
            id="enterRole"
            className="username-input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter Role"
          />
          {showError && (
            <p className="error-message">Employee Name is already taken</p>
          )}
        </div>
        <button type="submit" className="login-button">
          Add
        </button>
        {/* {showSubmitError && <p className="error-message">*{errorMsg}</p>} */}
      </form>
    </div>
  );
};

export default AddEmpScreen;
