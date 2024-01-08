import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type IdProps = {
  chatId: string | undefined;
};

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducer = getState();
      const token = (reducer as any)?.auth?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["Message"],

  endpoints: (builder) => ({
    //send message
    sendMessage: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `message/create-message`,
        body: data,
      }),

      invalidatesTags: ["Message"],
    }),

    getMessage: builder.query<any, IdProps>({
      query: ({ chatId }) => ({
        method: "GET",
        url: `message/get-message/${chatId}`,
      }),
      providesTags: ["Message"],
    }),
  }),
});

export const { useSendMessageMutation, useGetMessageQuery } = messageApi;
