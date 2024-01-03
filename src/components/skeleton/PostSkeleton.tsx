import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const PostSkeleton = () => {
    return (
        <div className="">
            {[1, 2, 3, 4].map((item, index) => (
                <Skeleton key={index} className=' dark:bg-bgDarkHover p-4 mt-6 bg-gray-100'>
                    <div className=" flex gap-2 px-4">
                        <Skeleton className="dark:bg-slate-800 w-10 h-10 bg-gray-200 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="w-[300px] h-2.5 rounded-full bg-gray-200 dark:bg-slate-800" />
                            <Skeleton className="w-[200px] h-1.5 rounded-full bg-gray-200 dark:bg-slate-800" />
                        </div>
                    </div>

                    <Skeleton className="dark:bg-slate-800 w-1/2 h-4 mt-6 bg-gray-200 rounded-full" />
                    <Skeleton className="dark:bg-slate-800 w-full h-40 mt-4 bg-gray-200 rounded" />
                    <Skeleton className="dark:bg-slate-800 w-full h-8 mt-2 bg-gray-200 rounded" />

                    <div className="flex gap-2 mt-4">
                        <Skeleton className="dark:bg-slate-800 w-full h-6 bg-gray-200 rounded" />
                        <Skeleton className="dark:bg-slate-800 w-full h-6 bg-gray-200 rounded" />
                        <Skeleton className="dark:bg-slate-800 w-full h-6 bg-gray-200 rounded" />
                    </div>
                </Skeleton>
            ))}
        </div>
    )
}

export default PostSkeleton