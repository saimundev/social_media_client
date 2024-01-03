import {
  SignUpProps,
  SignInProps,
  EmailVerifyProps,
  OtpCode,
  ChangePasswordProps,
  resentOTPPros,
  addFriendProps,
} from "@/types/AuthProps";
import { SearchProps, UsersProps } from "@/types/UserProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserIdProps = {
  userId: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpProps | FormData, SignUpProps | FormData>({
      query: (data) => ({
        method: "POST",
        url: "user/sign-up",
        body: data,
      }),
    }),

    signIn: builder.mutation<SignInProps, SignInProps>({
      query: (data) => ({
        method: "POST",
        url: "user/sign-in",
        body: data,
      }),
    }),

    otpVerify: builder.mutation<OtpCode, OtpCode>({
      query: (data) => ({
        method: "POST",
        url: `user/verify-otp`,
        body: data,
      }),
    }),

    resendOTP: builder.mutation<resentOTPPros, resentOTPPros>({
      query: (data) => ({
        method: "POST",
        url: `user/resend-otp`,
        body: data,
      }),
    }),

    emailVerification: builder.mutation<EmailVerifyProps, EmailVerifyProps>({
      query: ({ token }) => ({
        method: "POST",
        url: `user/email-verifier?token=${token}`,
      }),
    }),

    forgetPasswordEmailVerify: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: `user/forgotPassword-emailVerify`,
        body: data,
      }),
    }),

    changePassword: builder.mutation<ChangePasswordProps, ChangePasswordProps>({
      query: (data) => ({
        method: "POST",
        url: `user/change-password`,
        body: data,
      }),
    }),

    getUser: builder.query({
      query: ({ userId }) => ({
        method: "GET",
        url: `user/get-user/${userId}`,
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<any, any>({
      query: ({ data, userId }) => ({
        method: "PUT",
        url: `user/update-user/${userId}`,
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query<UsersProps[], SearchProps>({
      query: ({ search }) => ({
        method: "GET",
        url: `user/get-users?search=${search}`,
      }),
      providesTags: ["User"],
    }),

    addFriend: builder.mutation<addFriendProps, addFriendProps>({
      query: (data) => ({
        method: "PUT",
        url: `user/add-friend`,
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getFriends: builder.query<UsersProps[], UserIdProps>({
      query: ({ userId }) => ({
        method: "GET",
        url: `user/get-friends/${userId}`,
      }),
      providesTags: ["User"],
    }),

    updateProfilePhoto: builder.mutation<any, any>({
      query: ({ formData, userId }) => ({
        method: "PUT",
        url: `user/update-profile-photo/${userId}`,
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    updateCoverPhoto: builder.mutation<any, any>({
      query: ({ formData, userId }) => ({
        method: "PUT",
        url: `user/update-cover-photo/${userId}`,
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useForgetPasswordEmailVerifyMutation,
  useChangePasswordMutation,
  useOtpVerifyMutation,
  useResendOTPMutation,
  useSignUpMutation,
  useSignInMutation,
  useEmailVerificationMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useAddFriendMutation,
  useGetFriendsQuery,
  useUpdateUserMutation,
  useUpdateProfilePhotoMutation,
  useUpdateCoverPhotoMutation,
} = userApi;
