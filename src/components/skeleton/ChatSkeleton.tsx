import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const ChatSkeleton = () => {
    return (
        <div className="mt-4">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index} className='mt-2'>
                    <Skeleton className="dark:bg-slate-800 w-full h-10 bg-gray-200 rounded-lg" />
                </div>
            ))}
        </div>
    )
}

export default ChatSkeleton