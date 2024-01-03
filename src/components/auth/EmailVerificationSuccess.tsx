"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEmailVerificationMutation } from "@/store/api/userApi";
import { useEffect } from "react";
const EmailVerificationSuccess = () => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [emailVerificationToken, { isSuccess, isError, isLoading }] =
    useEmailVerificationMutation();

  //access token and send token to api
  useEffect(() => {
    if (token) {
      emailVerificationToken({ token });
    }
  }, [token]);

  //success message
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }
  }, [isSuccess]);

  if (isLoading)
    return (
      <h1 className="h-screen flex justify-center items-center">
        Please wait...
      </h1>
    );

  return (
    <>
      {isSuccess && (
        <div className="h-screen flex justify-center items-center">
          <Card className="text-center w-3/4">
            <CardHeader>
              <CardTitle className="">Congratulation</CardTitle>
              <p>Email verify successful</p>
            </CardHeader>
            <CardContent>
              <p className="mt-2">Please wait ...</p>
            </CardContent>
          </Card>
        </div>
      )}
      {isError && (
        <div className="h-screen flex justify-center items-center">
          <Card className="text-center w-3/4">
            <CardHeader>
              <CardTitle className="">
                Your verify email link is expeir
              </CardTitle>
              <p>this link valid 10 minutes</p>
            </CardHeader>
            <CardContent>
              <p className="mt-2">try again</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default EmailVerificationSuccess;
