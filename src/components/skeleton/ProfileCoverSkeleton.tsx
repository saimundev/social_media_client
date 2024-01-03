import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const ProfileCoverSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-52 dark:bg-bgDarkHover w-full bg-gray-200 rounded-lg" />
        </div>
    )
}

export default ProfileCoverSkeleton