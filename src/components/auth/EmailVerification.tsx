"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmailVerification = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-3/4 text-center">
        <CardHeader>
          <CardTitle className="">Verify your email address</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            You have entered <strong>saimunshezan@gmail.com</strong> as the email address for
            your account
          </p>
          <p className="mt-2">
            Please Verify your email address
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
