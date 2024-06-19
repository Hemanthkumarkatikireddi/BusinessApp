import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./businessReducer";
import employeeReducer from "./employeeReducer";

export const store = configureStore({
  reducer: {
    businesses: businessReducer,
    employees: employeeReducer,
  },
});
