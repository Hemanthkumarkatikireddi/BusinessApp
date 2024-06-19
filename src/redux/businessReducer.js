import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  businesses: [],
  showLocationError: false,
  showIncorrectCredentialsError: false,
  isLoggedIn: false,
  loggedInUser: {},
};

export const businessSlice = createSlice({
  name: "businesses",
  initialState,
  reducers: {
    addBusiness: (state, action) => {
      const newObj = action.payload;
      let allBusinesses = JSON.parse(localStorage.getItem("business"));
      allBusinesses =
        allBusinesses && allBusinesses?.length > 0 ? allBusinesses : [];
      console.log("allBusinesses", allBusinesses);
      const filteredBusinessByBusinessName =
        allBusinesses && allBusinesses.length > 0
          ? allBusinesses.filter(
              (each) => each.businessName === newObj.businessName
            )
          : [];
      if (filteredBusinessByBusinessName.length > 0) {
        const foundBusinessByLocation = filteredBusinessByBusinessName.find(
          (each) => each.location === newObj.location
        );
        if (foundBusinessByLocation) {
          state.showLocationError = true;
        } else {
          const newBusinessObj = { ...newObj };
          newBusinessObj["id"] = uuidv4();
          const newAllBusinesses = [...allBusinesses, newBusinessObj];
          state.businesses = newAllBusinesses;
          state.showLocationError = false;
          state.isLoggedIn = true;
          state.loggedInUser = newBusinessObj;
          localStorage.setItem("business", JSON.stringify(newAllBusinesses));
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("loggedInUser", JSON.stringify(newBusinessObj));
        }
      } else {
        const newBusinessObj = { ...newObj };
        newBusinessObj["id"] = uuidv4();
        const newAllBusinesses = [...allBusinesses, newBusinessObj];
        state.businesses = newAllBusinesses;
        state.showLocationError = false;
        state.isLoggedIn = true;
        state.loggedInUser = newBusinessObj;
        localStorage.setItem("business", JSON.stringify(newAllBusinesses));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("loggedInUser", JSON.stringify(newBusinessObj));
      }
    },
    getBusinesses: (state) => {
      const allBusinesses = localStorage.getItem("business");
      state.businesses = JSON.parse(allBusinesses);
      const loggedInStatus = localStorage.getItem("isLoggedIn");
      state.isLoggedIn = JSON.parse(loggedInStatus);
      const loggedInUserObj = localStorage.getItem("loggedInUser");
      state.loggedInUser = JSON.parse(loggedInUserObj);
    },
    saveBusinesses: (state) => {
      const allBusinesses = JSON.stringify(state.businesses);
      localStorage.setItem("business", allBusinesses);
    },
    loginBusiness: (state, action) => {
      const { email, password } = action.payload;
      const currBusinesses = JSON.parse(localStorage.getItem("business"));
      const foundUser = currBusinesses.find((each) => each.email === email);
      if (foundUser) {
        const isPasswordMatch = foundUser.password === password;
        if (isPasswordMatch) {
          state.showIncorrectCredentialsError = false;
          state.isLoggedIn = true;
          state.loggedInUser = foundUser;
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        } else {
          state.showIncorrectCredentialsError = true;
        }
      } else {
        state.showIncorrectCredentialsError = true;
      }
    },
    logoutBusiness: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
      localStorage.removeItem("loggedInUser");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBusiness,
  getBusinesses,
  saveBusinesses,
  loginBusiness,
  logoutBusiness,
} = businessSlice.actions;

export default businessSlice.reducer;
