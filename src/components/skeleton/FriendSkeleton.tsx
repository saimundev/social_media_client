import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const FriendSkeleton = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <Skeleton className="dark:bg-bgDarkHover h-24 bg-gray-200 rounded-lg" />
            <Skeleton className="dark:bg-bgDarkHover h-24 bg-gray-200 rounded-lg" />
            <Skeleton className="dark:bg-bgDarkHover h-24 bg-gray-200 rounded-lg" />
            <Skeleton className="dark:bg-bgDarkHover h-24 bg-gray-200 rounded-lg" />
        </div>
    )
}

export default FriendSkeleton