"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  userToken: string | null | undefined;
}

const token = getCookie("access_token");

//verify token
const verifyToken = () => {
  if (token) {
    const decode = jwtDecode(token);
    const expairIn = Number(new Date()) / 1000 >= (decode as any)?.exp;

    if (expairIn) {
      deleteCookie("userToken");
      return null;
    } else {
      return token;
    }
  }
};

const initialState: AuthState = {
  user: token ? jwtDecode(token) : null,
  userToken: token ? verifyToken() : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<string | any>) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },

    logOut: (state) => {
      state.user = null;
      state.userToken = null;
      deleteCookie("access_token");
    },
  },
});

export const { getUser, logOut } = authSlice.actions;
export default authSlice.reducer;
