import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutBusiness } from "../redux/businessReducer";
import { useNavigate } from "react-router-dom";
import { refresh } from "../redux/employeeReducer";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.businesses);
  const { employees } = useSelector((state) => state.employees);
  const [myEmployees, setMyEmployees] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  });

  useEffect(() => {
    const myCompanyEmployees =
      employees && employees.length > 0
        ? employees.filter((each) => each.businessId === loggedInUser.id)
        : [];
    setMyEmployees(myCompanyEmployees);
  }, [employees, loggedInUser]);

  return (
    <div className="home-container">
      <div className="signout-container">
        <button
          className="signOut-button"
          onClick={() => dispatch(logoutBusiness())}
        >
          Sign Out
        </button>
      </div>
      <div className="cart">
        <div className="form-container">
          <h1>
            <span className="hi">Hi</span> {loggedInUser?.firstName}{" "}
            {loggedInUser?.lastName}
          </h1>
          <h2>
            {loggedInUser?.businessName},{" "}
            <span className="hi">{loggedInUser?.location}</span>
          </h2>
        </div>
      </div>
      <div className="employee-container">
        <div className="employee-container-box">
          <h2>Employee Details</h2>
          <button
            className={`signOut-button ${myEmployees.length === 3 && "shaded"}`}
            onClick={() => navigate("/addEmp")}
            disabled={myEmployees.length === 3}
          >
            Add Employee
          </button>
        </div>
        <div className="employee-details">
          {myEmployees && myEmployees.length > 0 ? (
            myEmployees.map((each) => (
              <div className="employee" key={each.id}>
                <h3>
                  {each.firstName} {each?.lastName}
                </h3>
                <span className="hi">{each?.role}</span>
              </div>
            ))
          ) : (
            <h4>No Employee Details</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
