"use client";

import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import Container from "../shared/Container";
import { Button } from "../ui/button";
import CountDownTimer from "../shared/CountDownTimer";
import { useOtpVerifyMutation } from "@/store/api/userApi";
import { useRouter } from "next/navigation"
import { OtpCode } from "@/types/AuthProps";
import { useToast } from "../ui/use-toast";

const PasswordOtpVerify = () => {
    const [otp, setOtp] = useState('');
    const [otpCode, { isSuccess, isLoading, error, data }] = useOtpVerifyMutation();
    const router = useRouter();
    const { toast } = useToast();

    //error message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive",
            });
        }
    }, [error])


    useEffect(() => {
        if (isSuccess) {
            router.push("/change-password")
            toast({
                title: "Successful"
            });
        }




    }, [isSuccess, data])

    const handleOtpCode = () => {
        const otpData: OtpCode = {
            otp: otp
        }
        otpCode(otpData)
    }

    return (
        <div className="bg-bgColor h-screen">
            <Container className="flex items-center justify-center h-screen">
                <Card className="w-1/2">

                    <CardHeader>
                        <CardTitle>Enter Your OTP Code</CardTitle>
                        <CardDescription>Please enter your email address  to search for your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <OtpInput
                            inputStyle={{ width: "60px", height: "50px", borderRadius: "4px", border: "2px solid teal", color: 'black' }}
                            containerStyle={{ display: "flex", gap: "20px" }}
                            value={otp}
                            onChange={setOtp}
                            shouldAutoFocus={true}
                            numInputs={4}
                            renderInput={(props) => <input {...props} type="number" className="text-2xl font-semibold outline-none" />}
                        />

                        <div className="flex justify-end">

                            <CountDownTimer initialMinute={1} initialSeconds={20} />



                        </div>
                    </CardContent>

                    <CardFooter className="gap-6">
                        <Button onClick={handleOtpCode} size="lg" className="w-full" disabled={otp?.length === 4 ? false : true}>{isLoading ? "Loding" : "Submit"}</Button>
                    </CardFooter>


                </Card>

            </Container>
        </div>
    );
};

export default PasswordOtpVerify;
