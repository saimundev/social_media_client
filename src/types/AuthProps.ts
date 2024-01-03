export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface EmailVerifyProps {
  token: string;
}

export interface resentOTPPros {
  email: string;
  userId: string;
}

export interface OtpCode {
  otp: string;
  accountVerify?: boolean;
}

export interface ChangePasswordProps {
  email: string;
  password: string;
  conPassword: string;
}

export interface addFriendProps {
  userId: string | undefined;
  friendId: string | undefined;
}
