"use client";

import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetFriendsQuery } from '@/store/api/userApi'
import Link from 'next/link'

type UserIdProps = {
    userId: string | undefined
}

const FriendMessageList = ({ userId = "" }: UserIdProps) => {
    const { data } = useGetFriendsQuery({ userId })

    return (
        <div className=''>
            {data?.length ? data?.map((friend) => (
                <div key={friend._id} >
                    <Link href={`/message?Id=${friend._id}`} className='hover:bg-gray-100 flex items-center gap-4 p-2 rounded cursor-pointer'>
                        <Avatar>
                            <AvatarImage src={friend.profile.secure_url} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='text-sm font-bold capitalize'>{friend.name}</p>
                    </Link>
                </div>
            )) : <div className="mt-10 text-sm text-center">No Friends Yet</div>}


        </div>
    )
}

export default FriendMessageList