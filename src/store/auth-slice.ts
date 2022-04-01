import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from ".";
import { auth } from "../firebaseConfig";

const initialState = {
  isAuthenticated: false,
  isShowingLoginForm: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setShowLoginForm(state, action) {
      state.isShowingLoginForm = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
