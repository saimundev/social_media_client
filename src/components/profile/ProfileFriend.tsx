import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useAppSelector } from '@/store/hooks'
import { useAddFriendMutation, useGetFriendsQuery, useGetUserQuery } from '@/store/api/userApi'
import Link from 'next/link'
import FriendSkeleton from '../skeleton/FriendSkeleton'

const ProfileFriend = ({ currentUser, userData }: { currentUser: string, userData: any }) => {
    const user = useAppSelector((state) => state.auth.user)
    const [addFriend, { isLoading, isSuccess, isError }] = useAddFriendMutation()
    const { data } = useGetUserQuery({ userId: user?.id })
    const { data: profileData, isLoading: loading, isError: error } = useGetFriendsQuery({ userId: currentUser })

    const handleAddFriend = () => {
        const friendInfo = {
            userId: user?.id,
            friendId: currentUser
        }

        //api call for add friend
        addFriend(friendInfo)
    }

    return (
        <div className="">
            {/* hide button when user friend him self */}
            {
                loading ? null : currentUser != user?.id && <div className="flex justify-end mb-8">
                    {data?.user?.friends?.includes(currentUser) ? <Button size="lg" onClick={handleAddFriend}>Remove Friend</Button> : <Button size="lg" onClick={handleAddFriend}>Add Friend</Button>}
                </div>
            }

            <div className="">
                <h3 className='mb-2 text-base font-semibold'>Friends</h3>
                {loading ?
                    <FriendSkeleton /> :
                    error ?
                        <div className="">Error</div> :
                        <div className=" grid grid-cols-2 gap-4">
                            {profileData?.length ? profileData?.map((friend) => (
                                <Link href={`profile?userId=${friend._id}`} key={friend._id}>
                                    <Card className='dark:bg-bgDark flex flex-col items-center p-4'>
                                        <img className="w-14 h-14 object-cover rounded-full" src={friend.profile?.secure_url} alt="" />
                                        <h3 className="mt-2 text-sm font-medium">{friend.name}</h3>
                                    </Card>
                                </Link>
                            )) : <div className="ml-2 text-sm">No Friends Yet</div>}

                        </div>}
            </div>
        </div>

    )
}

export default ProfileFriend