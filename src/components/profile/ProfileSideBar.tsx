"use client";

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from "@/components/ui/textarea"
import { useUpdateUserMutation } from '@/store/api/userApi';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import ProfileInfoSkeleton from '../skeleton/ProfileInfoSkeleton';


const FormSchema = z.object({
    name: z.string().min(3, {
        message: "name must be at least 3 characters.",
    }),
    phone: z.number().multipleOf(0.01).optional().or(z.literal('')),
    bio: z.string().min(30, { message: "Bio must be at least 30 characters" }).optional().or(z.literal('')),
    status: z.string().optional().or(z.literal('')),
    city: z.string().optional().or(z.literal('')),
    portfolio: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
})


const ProfileSidebar = ({ profileInfo, userId, profileSideBarLoading }: any) => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),


    })
    const user = useAppSelector((state) => state.auth.user)
    const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation()


    //form default value
    useEffect(() => {
        if (profileInfo) {
            form.reset({
                name: profileInfo.user.name,
                phone: profileInfo.user.phone || "",
                status: profileInfo.user.status || "",
                portfolio: profileInfo.user.portfolio || "",
                github: profileInfo.user.github || "",
                linkedin: profileInfo.user.linkedin || "",
                bio: profileInfo.user.bio || "",

            })
        }
    }, [profileInfo]);

    useEffect(() => {
        if (isSuccess) {
            setOpen(false)
        }
    }, [isSuccess])

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        updateUser({ data, userId })
    }

    if (profileSideBarLoading) return <div className=""><ProfileInfoSkeleton /></div>
    return (
        <div className='overflow-hidden'>
            <Card className='dark:bg-bgDark mt-2'>
                <CardHeader>

                    <CardTitle className='capitalize'>{profileInfo?.user?.name}</CardTitle>
                    <CardDescription>{profileInfo?.user?.bio}</CardDescription>
                </CardHeader>
                <CardContent className=" dark:text-gray-400 space-y-1 text-gray-600">
                    <h2 className='dark:text-white text-xl font-semibold text-black'>Info</h2>
                    <div className="flex gap-2 overflow-hidden">
                        <div className="space-y-2 text-sm">
                            <h3>Email:</h3>
                            <h3>Phone:</h3>
                            <h3>Status:</h3>
                            <h3>City:</h3>
                            <h3>Portfolio:</h3>
                            <h3>Github:</h3>
                            <h3>Linkedin:</h3>
                        </div>
                        <div className='space-y-2.5 font-medium text-gray-600 dark:text-gray-400 text-sm '>
                            <p>{profileInfo?.user?.email}</p>
                            <p>{profileInfo?.user?.phone}</p>
                            <p>{profileInfo?.user?.status}</p>
                            <p>{profileInfo?.user?.city}</p>
                            <Link href={profileInfo?.user?.portfolio || ""} target='_blank'>{profileInfo?.user?.portfolio}</Link>
                            <Link href={profileInfo?.user?.github || ""} target='_blank'> {profileInfo?.user?.github}</Link>
                            <Link href={profileInfo?.user?.linkedin || ""} target='_blank'>{profileInfo?.user?.linkedin}</Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {userId === user?.id && <Button className='w-full' onClick={() => setOpen(true)}>Edit Profile</Button>}

                    <AlertDialog
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <AlertDialogContent className="h-[600px] max-w-xl overflow-y-scroll dark:bg-bgDark">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Edit Information</AlertDialogTitle>

                                {/* edit form  */}
                                <AlertDialogDescription>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
                                            {/* name field */}
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* phone number field */}
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Phone" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* status  field */}
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="single">Single</SelectItem>
                                                                <SelectItem value="Marred">Marred</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* city  field */}
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>City</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="City" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/*portfolio  field */}
                                            <FormField
                                                control={form.control}
                                                name="portfolio"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Portfolio</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Portfolio" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/*github field */}
                                            <FormField
                                                control={form.control}
                                                name="github"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Github</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Github" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            {/*linkedin field */}
                                            <FormField
                                                control={form.control}
                                                name="linkedin"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Linkedin</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="linkedin" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/*bio field */}
                                            <FormField
                                                control={form.control}
                                                name="bio"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Bio</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Bio" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* submit button */}
                                            <div className="flex justify-between">
                                                <Button type="submit" size="lg">{isLoading ? "Updating..." : "Submit"}</Button>
                                                <Button onClick={() => setOpen(false)} type="submit" variant="outline" size="lg" className='hover:bg-red-500 hover:text-white text-red-500 border border-red-500'>Cancel</Button>
                                            </div>
                                        </form>
                                    </Form>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                        </AlertDialogContent>
                    </AlertDialog>

                </CardFooter>
            </Card>
        </div>
    )
}

export default ProfileSidebar