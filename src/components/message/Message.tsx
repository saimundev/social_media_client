import React from 'react'
import { cn } from '@/lib/utils'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type MessageProps = {
    ownMessage?: boolean
}

const Message = ({ ownMessage }: MessageProps) => {
    return (
        <div className={cn("space-y-2", ownMessage ? "flex justify-end" : "")}>
            <div className="">
                <div className="flex gap-2 mb-1">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="bg-bgColor p-2 text-white rounded-full">
                        how are you
                    </div>
                </div>
                <small className='text-sm font-medium text-gray-500'>
                    1 hour ago
                </small>
            </div>
        </div>
    )
}

export default Message