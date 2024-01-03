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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForgetPasswordEmailVerifyMutation } from "@/store/api/userApi";
import Container from "../shared/Container";
import Link from "next/link";

interface EMailOTPPros {
    email: string
}

const FormSchema = z.object({
    email: z
        .string()
        .min(6, {
            message: "email must be at least 6 characters.",
        })
        .max(30, { message: "email must be max 30 characters" })
        .email(),
});

const ForgotPassword = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [userEmail, { isLoading, isSuccess, error, data }] = useForgetPasswordEmailVerifyMutation();
    const route = useRouter();
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

    //success message
    useEffect(() => {
        if (isSuccess && data) {
            route.push(`/password-otp-verify?userId=${data?._id}&email=${data?.email}`)

        }
    }, [isSuccess, data])




    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const email: EMailOTPPros = {
            email: data?.email
        }
        userEmail(email)
    };

    return (
        <div className="bg-bgColor h-screen">
            <Container className="flex items-center justify-center h-screen">
                <Card className="w-1/2">

                    <CardHeader>
                        <CardTitle>Find Your Account</CardTitle>
                        <CardDescription>Please enter your email address  to search for your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
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


                                <div className="flex justify-end items-center !mt-8 gap-4">

                                    <Button asChild variant="outline">
                                        <Link href="/sign-in">Cancel</Link>
                                    </Button>
                                    <Button type="submit" variant="success" disabled={isLoading}>
                                        {isLoading ? "Loading" : "Submit"}
                                    </Button>
                                </div>

                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter >


                    </CardFooter>
                </Card>

            </Container>
        </div>
    );
};

export default ForgotPassword;
