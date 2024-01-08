"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetUserQuery } from '@/store/api/userApi';
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type UserIdProps = {
    userId: string | undefined
}

const FriendMessageList = ({ chat, currentUserId }: any) => {
    const friendId = chat?.members?.find((id: any) => id !== currentUserId)
    const { data } = useGetUserQuery({ userId: friendId })
    return (
        <div>
            <Link href={`/message?Id=${data?.user?._id}&chatId=${chat._id}`} className='hover:bg-gray-100 dark:bg-slate-800 flex items-center gap-4 p-2 bg-gray-100 rounded cursor-pointer'>
                <Avatar>
                    <AvatarImage src={data?.user?.profile?.secure_url} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className='text-sm font-bold capitalize'>{data?.user?.name}</p>
            </Link>
        </div>
    )
}

export default FriendMessageList