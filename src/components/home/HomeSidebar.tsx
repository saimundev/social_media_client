import React from 'react'
import { Button } from '../ui/button'
import { useGetUserQuery } from '@/store/api/userApi'
import Link from 'next/link'
import ProfileCartSkeleton from '../skeleton/ProfileCartSkeleton'


type UserPostProps = {
    userId: string | undefined
}

const HomeSidebar = ({ userId = "" }: UserPostProps) => {
    const { data, isLoading, isError } = useGetUserQuery({ userId })

    if (isLoading) return <div className=""><ProfileCartSkeleton /></div>

    return (
        <div>
            <div className="border-bgColor dark:bg-bgDark dark:border-none top-14 sticky border rounded">
                <div className="relative">
                    <img className='h-52 object-cover w-full' src={data.user.cover?.secure_url || "https://e0.pxfuel.com/wallpapers/137/952/desktop-wallpaper-facebook-cover-love-lovely-nice-cool-touch-beauty.jpg"} alt="" />
                    <img className="w-40 h-40 object-cover absolute bottom-[-80px] left-[50%] translate-x-[-50%] rounded-full" src={data.user.profile.secure_url} alt="profile_pic" />
                </div>

                <div className="mt-24 text-center">
                    <div className='text-bgColor text-2xl font-semibold'>{data.user.name}</div>
                    <div className='dark:text-white text-base font-medium text-black'>{data.user.email}</div>

                    {/* profile summary */}
                    <div className="px-4 pb-4">
                        <div className="flex justify-between mt-6 text-center">
                            <div className="border-bgColor flex-1 py-1 border">
                                <h4 className='text-bgColor font-semibold'>Friends</h4>
                                <p className="font-semibold">{data.user.friends?.length}</p>
                            </div>
                            <div className="border-bgColor flex-1 py-1 border">
                                <h4 className='text-bgColor font-semibold'>Posts</h4>
                                <p className="font-semibold">{data.totalPost}</p>
                            </div>

                            <div className="border-bgColor flex-1 py-1 border">
                                <h4 className='text-bgColor font-semibold'>Likes</h4>
                                <p className="font-semibold">{data.totalLike[0]?.totalObjects || 0}</p>
                            </div>


                        </div>
                        <Button asChild className='w-full mt-6'>
                            <Link href={`/profile?userId=${data.user?._id}`}>
                                Go To Profile
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeSidebar