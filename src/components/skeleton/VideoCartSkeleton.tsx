import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const VideoCartSkeleton = () => {
    return (
        <div className='grid grid-cols-3 gap-4 mt-6'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((video, index) => (
                <Skeleton key={index} className="dark:bg-bgDarkHover h-60 bg-gray-200 rounded-lg" />
            ))}


        </div>
    )
}

export default VideoCartSkeleton;