import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

const initialState: AuthState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authSelectors = {
  isLoggedIn: (state: RootState) => !!state.auth.token,
};
