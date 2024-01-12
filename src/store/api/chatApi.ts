import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type IdProps = {
  userId: string | undefined;
};

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducer = getState();
      const token = (reducer as any)?.auth?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["Chat"],

  endpoints: (builder) => ({
    //create chat
    createChat: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `chat/create-chat`,
        body: data,
      }),

      invalidatesTags: ["Chat"],
    }),

    //get chat
    getChat: builder.query({
      query: ({ userId }) => ({
        method: "GET",
        url: `chat/get-chats/${userId}`,
      }),

      providesTags: ["Chat"],
    }),
  }),
});

export const { useCreateChatMutation, useGetChatQuery } = chatApi;
