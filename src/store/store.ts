import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authSlice from "./features/authSlice";
import { postApi } from "./api/postAPi";
import { chatApi } from "./api/chatApi";
import { messageApi } from "./api/messageApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,

    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      postApi.middleware,
      chatApi.middleware,
      messageApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
