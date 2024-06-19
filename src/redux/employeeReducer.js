import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  employees: [],
  showError: false,
  isAdded: false,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newObj = action.payload;
      let allEmployees = JSON.parse(localStorage.getItem("employees"));
      allEmployees =
        allEmployees && allEmployees.length > 0 ? allEmployees : [];
      const foundEmployee = allEmployees.find(
        (each) =>
          each.firstName === newObj.firstName &&
          each.lastName === newObj.lastName &&
          each.businessId === newObj.businessId
      );
      if (foundEmployee) {
        state.showError = true;
      } else {
        const newEmployee = { ...newObj };
        newEmployee["id"] = uuidv4();
        const newAllEmployees = [...allEmployees, newEmployee];
        state.employees = newAllEmployees;
        state.showError = false;
        localStorage.setItem("employees", JSON.stringify(newAllEmployees));
        state.isAdded = true;
      }
    },
    getEmployees: (state, action) => {
      const allEmployees = localStorage.getItem("employees");
      state.employees = JSON.parse(allEmployees);
    },
    refresh: (state) => {
      state.isAdded = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEmployee, getEmployees, refresh } = employeeSlice.actions;

export default employeeSlice.reducer;
