import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const ProfileInfoSkeleton = () => {
    return (
        <Skeleton className='dark:bg-bgDarkHover p-4 bg-gray-100 rounded-lg'>
            <Skeleton className='dark:bg-slate-800 w-10/12 h-5 bg-gray-200' />
            <div className="mt-4 space-y-2">
                <Skeleton className='dark:bg-slate-800 w-full h-2 bg-gray-200' />
                <Skeleton className='dark:bg-slate-800 w-full h-2 bg-gray-200' />
                <Skeleton className='dark:bg-slate-800 w-full h-2 bg-gray-200' />
                <Skeleton className='dark:bg-slate-800 w-full h-2 bg-gray-200' />
            </div>
            <div className="mt-10">
                <Skeleton className='dark:bg-slate-800 w-full h-8 bg-gray-200' />
            </div>
        </Skeleton>
    )
}

export default ProfileInfoSkeleton