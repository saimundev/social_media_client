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
  onlineUser: {
    userId: string;
    socketId: string;
  }[];
}

const token = getCookie("access_token");

const initialState: AuthState = {
  user: token ? jwtDecode(token) : null,
  userToken: token ? token : null,
  onlineUser: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<string | any>) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },

    onlineUsers: (state, action) => {
      state.onlineUser = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.userToken = null;
      deleteCookie("access_token");
    },
  },
});

export const { getUser, logOut, onlineUsers } = authSlice.actions;
export default authSlice.reducer;
