"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import HomeIcon from '../icon/HomeIcon'
import GroupIcon from '../icon/GroupIcon'
import MessageIcon from '../icon/MessageIcon'
import VideoIcon from '../icon/VideoIcon'
import BellIcon from '../icon/BellIcon'
import CustomTooltip from './CustomTooltip'
import Container from './Container'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutIcon from '../icon/LogoutIcon'
import { useGetUserQuery } from '@/store/api/userApi'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logOut } from '@/store/features/authSlice'
import { useRouter, usePathname } from "next/navigation"
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import FriendMessageList from '../message/FriendMessageList';
import { useGetChatQuery } from '@/store/api/chatApi';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { setTheme } = useTheme()
    const user = useAppSelector((state) => state.auth.user)
    const { data } = useGetUserQuery({ userId: user?.id })
    const { data: chatData } = useGetChatQuery({ userId: user?.id })
    const { onlineUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logOut())
        router.push("/sign-in")
    }

    const pathname = usePathname()

    return (
        <header className='dark:bg-bgDark dark:border-none sticky top-0 z-50 bg-white border-b border-gray-300 shadow'>
            <Container className='relative flex items-center justify-between py-2'>
                <div className="text-xl font-bold">FRIEND<sub className='text-bgColor'>zone</sub></div>
                <nav className="flex gap-2">

                    <CustomTooltip className={cn("hover:bg-gray-200 dark:hover:bg-bgDarkHover px-6 py-2 rounded", pathname === "/" && "bg-gray-200 dark:bg-bgDarkHover")} message="Home">
                        <Link href="/"  >
                            <HomeIcon className='w-7 h-7' />
                        </Link>
                    </CustomTooltip>


                    <CustomTooltip className={cn('hover:bg-gray-200 dark:hover:bg-bgDarkHover px-6 py-2 rounded', pathname === "/video" && "bg-gray-200 dark:bg-bgDarkHover")} message="Video">
                        <Link href="/video"  >
                            <VideoIcon className='w-7 h-7' />
                        </Link>
                    </CustomTooltip>
                    <CustomTooltip className={cn('hover:bg-gray-200 dark:hover:bg-bgDarkHover px-6 py-2 rounded', pathname === "/users" && "bg-gray-200 dark:bg-bgDarkHover")} message="Users">
                        <Link href="/users"  >
                            <GroupIcon className='w-7 h-7' />
                        </Link>
                    </CustomTooltip>
                </nav>

                <nav className="flex gap-4">
                    <CustomTooltip message="Message">
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger className='dark:bg-bgDarkHover p-1 bg-gray-200 rounded-full'>
                                <MessageIcon className='w-7 h-7' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-80 h-[calc(100vh-64px)] grid content-between mt-2'>
                                <div className=" overflow-hidden overflow-y-auto">
                                    <DropdownMenuLabel className='py-2 text-base'>Messages</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="px-2 space-y-2">
                                        {chatData?.map((chat: any) => (
                                            <div className="" onClick={() => setDropdownOpen(false)}>
                                                <FriendMessageList chat={chat} currentUserId={user?.id} onlineUser={onlineUser} />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <Button variant="link" asChild className='flex-auto text-blue-500'>
                                    <Link href="/message">All Message</Link>
                                </Button>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </CustomTooltip>

                    <CustomTooltip message="Notification">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='dark:bg-bgDarkHover p-2 bg-gray-200 rounded-full'>
                                <BellIcon className='w-7 h-7' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-80 !h-[500px] mt-1'>
                                <DropdownMenuLabel className='py-2 text-base'>Notification</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="place-items-center grid h-full text-sm">
                                    No Notification Yet
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </CustomTooltip>

                    <CustomTooltip message="Profile">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={data?.user?.profile?.secure_url} alt={data?.user?.name} />
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-80 -right-4 top-2 absolute'>
                                <DropdownMenuLabel className='flex items-center gap-4' asChild>
                                    <Link href={`/profile?userId=${data?.user?._id}`}>
                                        <Avatar className='w-8 h-8'>
                                            <AvatarImage
                                                src={data?.user?.profile?.secure_url}
                                                alt={data?.user?.name}
                                            />
                                            <AvatarFallback>P</AvatarFallback>
                                        </Avatar>

                                        <div className="text-base font-medium capitalize">
                                            {data?.user?.name}
                                        </div>
                                    </Link>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel onClick={handleLogout} className='flex gap-2 pb-4 text-sm font-medium cursor-pointer'>
                                    <LogoutIcon className='w-4 h-4' />
                                    Log out
                                </DropdownMenuLabel>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CustomTooltip>

                    {/* light mode  dark mode*/}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='border-none' size="icon">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className='mt-2' >
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </Container>
        </header>
    )
}

export default Header