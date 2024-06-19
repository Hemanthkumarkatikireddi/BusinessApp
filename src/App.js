import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./components/HomeScreen.jsx";
import SignUpScreen from "./components/SignUpScreen.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import AddEmpScreen from "./components/AddEmpScreen.jsx";
import NotFound from "./components/NotFound.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getBusinesses } from "./redux/businessReducer.js";
import { getEmployees } from "./redux/employeeReducer.js";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.businesses);

  useEffect(() => {
    dispatch(getBusinesses());
    dispatch(getEmployees());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn ? <HomeScreen /> : <Navigate to="login" />}
        />
        <Route
          exact
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUpScreen />}
        />
        <Route
          exact
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <LoginScreen />}
        />
        <Route
          exact
          path="/addEmp"
          element={isLoggedIn ? <AddEmpScreen /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
