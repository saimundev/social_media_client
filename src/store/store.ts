import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authSlice from "./features/authSlice";
import { postApi } from "./api/postAPi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,

    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, postApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
