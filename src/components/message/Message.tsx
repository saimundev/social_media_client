import React from 'react'
import { cn } from '@/lib/utils'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { format } from 'timeago.js';

type MessageProps = {
    ownMessage?: boolean
    message: any
    friendProfile: any
}

const Message = ({ ownMessage, message, friendProfile }: MessageProps) => {
    return (
        <div className={cn("space-y-2 pb-2 px-2", ownMessage ? "flex justify-end" : "")}>
            <div className="">
                <div className="flex gap-2 mb-1">
                    {!ownMessage && <Avatar>
                        <AvatarImage src={friendProfile?.user?.profile?.secure_url} alt={friendProfile?.user?.name} />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>}

                    <div className={cn("p-2 text-white rounded-full", ownMessage ? "bg-bgColor" : "bg-gray-200 text-black dark:bg-bgDarkHover dark:text-white")}>
                        {message.text}
                    </div>
                </div>
                <small className='text-sm font-medium text-gray-500'>
                    {format(message.createdAt)}
                </small>
            </div>
        </div>
    )
}

export default Message