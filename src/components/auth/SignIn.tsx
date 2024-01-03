"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSignInMutation } from "@/store/api/userApi";
import { SignInProps } from "@/types/AuthProps";
import EyeOpenIcon from "../icon/EyeOpenIcon";
import EyeCloseIcon from "../icon/EyeCloseIcon";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/features/authSlice";
import { setCookie } from 'cookies-next';
import Container from "../shared/Container";
import Link from "next/link";

const FormSchema = z.object({
  email: z
    .string()
    .min(6, {
      message: "email must be at least 6 characters.",
    })
    .max(30, { message: "email must be max 30 characters" })
    .email(),
  password: z
    .string()
    .min(5, {
      message: "password must be at least 5 characters.",
    })
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const [loginUser, { isSuccess, isLoading, error, data }] =
    useSignInMutation();
  const dispatch = useAppDispatch();

  //error message
  useEffect(() => {
    if (error) {
      toast({
        title: (error as any)?.data?.message,
        variant: "destructive",
      });
    }
  }, [error]);

  //success message
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Login successful",
        variant: "success",
      });

      router.push("/");

      //store data in cookie storage
      setCookie("access_token", (data as any)?.token)
      dispatch(getUser((data as any)?.token))
    }
  }, [isSuccess]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    //user object
    const loginUserData: SignInProps = {
      email: data.email,
      password: data.password,
    };

    //create user
    loginUser(loginUserData);
  };

  return (
    <div className="bg-bgColor h-screen">
      <Container>
        <div className="grid grid-cols-[1fr_1fr] items-center h-screen ">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome to FriendZone</h1>
            <h3 className="mt-3 text-2xl text-white">Connect Your Friend And Family</h3>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
            </CardHeader>
            <CardContent className="pb-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  {/* email field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* confirm password field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <div
                            className=""
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOpenIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                            ) : (
                              <EyeCloseIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isLoading} type="submit" className="w-full !mt-6">
                    {isLoading ? "Loading..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <div className="flex justify-end">
              <Button asChild variant="link" className="mt-2 text-gray-600">
                <Link href="forgot-password">Forgotten password?</Link>
              </Button>
            </div>
            <CardFooter className="flex flex-col justify-center">

              <Button asChild variant="success" className="mt-4">
                <Link href="sign-up">Create Account</Link>
              </Button>


            </CardFooter>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
