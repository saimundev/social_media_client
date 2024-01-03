import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useResendOTPMutation } from "@/store/api/userApi";
import { resentOTPPros } from "@/types/AuthProps";
import { useToast } from "../ui/use-toast";
import { useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation"

type TimerCounterProps = {
    initialMinute: number
    initialSeconds: number
}

const CountDownTimer = ({ initialMinute = 0, initialSeconds = 0 }: TimerCounterProps) => {
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [sendOtp, { isLoading, error, isSuccess }] = useResendOTPMutation();
    const { user } = useAppSelector((state) => state.auth)
    const { toast } = useToast();
    const params = useSearchParams();
    const userId = params.get("userId") || ""
    const email = params.get("email") || ""



    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });


    //error message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive",
            });
        }
    }, [error])


    //success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "OTP Send Successful",
                variant: "success",
            });

            setMinutes(1)
            setSeconds(20)
        }
    }, [isSuccess])

    const resentOTP = () => {
        if (user) {
            const resentOTPData: resentOTPPros = {
                email: user.email,
                userId: user.id
            }
            sendOtp(resentOTPData)
        } else {
            const resentOTPData: resentOTPPros = {
                email: email,
                userId: userId
            }
            sendOtp(resentOTPData)
        }
    }

    return (
        <div>
            {minutes === 0 && seconds === 0
                ? <Button disabled={isLoading} onClick={resentOTP}>{isLoading ? "Loading" : "Resent OTP"}</Button>
                : <h1 className="text-bgColor font-semibold"> Resent OTP 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default CountDownTimer;