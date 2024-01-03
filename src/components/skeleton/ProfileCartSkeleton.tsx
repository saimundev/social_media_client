import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const ProfileCartSkeleton = () => {
    return (
        <div>
            <Skeleton className="dark:bg-bgDarkHover bg-gray-100 rounded" >
                <Skeleton className="h-52 dark:bg-slate-800 w-full bg-gray-200 rounded" />
                <div className="p-4 mt-10">
                    <div className="">
                        <Skeleton className="w-60 dark:bg-slate-800 h-6 bg-gray-200 rounded-full" />
                        <Skeleton className="w-60 dark:bg-slate-800 h-3 mt-2 bg-gray-200 rounded-full" />
                    </div>

                    <div className="flex gap-2 mt-6">
                        <Skeleton className="dark:bg-slate-800 flex-1 h-8 bg-gray-200" />
                        <Skeleton className="dark:bg-slate-800 flex-1 h-8 bg-gray-200" />
                        <Skeleton className="dark:bg-slate-800 flex-1 h-8 bg-gray-200" />
                    </div>
                    <Skeleton className="dark:bg-slate-800 w-full h-8 mt-6 bg-gray-200 rounded-lg" />
                </div>
            </Skeleton>
        </div>
    )
}

export default ProfileCartSkeleton