import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const FriendListSkeleton = () => {
    return (
        <div className="mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                <div key={index} className='flex items-center gap-4 mt-2'>
                    <Skeleton className="dark:bg-slate-800 w-10 h-10 bg-gray-200 rounded-full" />
                    <Skeleton className="dark:bg-slate-800 w-40 h-3 bg-gray-200 rounded-full" />
                </div>
            ))}
        </div>
    )
}

export default FriendListSkeleton