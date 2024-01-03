import {
  CommentPostProps,
  CreatePostProps,
  LikePostProps,
  PostProps,
  videoProps,
} from "@/types/PostProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type IdProps = {
  userId: string | undefined;
};

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducer = getState();
      const token = (reducer as any)?.auth?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    //crate post
    createPost: builder.mutation<
      CreatePostProps | FormData,
      CreatePostProps | FormData
    >({
      query: (data) => ({
        method: "POST",
        url: `post/create-post`,
        body: data,
      }),

      invalidatesTags: ["Post"],
    }),

    //get timeLine post
    getTimeLinePost: builder.query<any, IdProps>({
      query: ({ userId }: IdProps) => ({
        method: "GET",
        url: `post/get-timeLinePost/${userId}`,
      }),

      providesTags: ["Post"],
    }),

    //get post by user
    getPostByUser: builder.query<PostProps[], IdProps>({
      query: ({ userId }: IdProps) => ({
        method: "GET",
        url: `post/get-posts/${userId}`,
      }),

      providesTags: ["Post"],
    }),

    //delete post
    deletePost: builder.mutation<string, string>({
      query: (id) => ({
        method: "DELETE",
        url: `post/delete-post/${id}`,
      }),

      invalidatesTags: ["Post"],
    }),

    //update post
    updatePost: builder.mutation<any, any>({
      query: ({ formData, postId }) => ({
        method: "PUT",
        url: `post/update-post/${postId}`,
        body: formData,
      }),

      invalidatesTags: ["Post"],
    }),

    //like post
    likePost: builder.mutation<LikePostProps, LikePostProps>({
      query: (data) => ({
        method: "PUT",
        url: `post/like-post`,
        body: data,
      }),

      invalidatesTags: ["Post"],
    }),

    //comment post
    commentPost: builder.mutation<CommentPostProps, CommentPostProps>({
      query: (data) => ({
        method: "PUT",
        url: `post/comment-post`,
        body: data,
      }),

      invalidatesTags: ["Post"],
    }),

    //comment post
    getVideo: builder.query<videoProps[], videoProps[]>({
      query: () => ({
        method: "GET",
        url: `post/get-video`,
      }),
    }),
  }),
});

export const {
  useGetPostByUserQuery,
  useCreatePostMutation,
  useGetTimeLinePostQuery,
  useLikePostMutation,
  useCommentPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetVideoQuery,
} = postApi;
