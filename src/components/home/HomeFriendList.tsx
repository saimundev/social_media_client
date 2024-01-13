import { useGetUsersQuery } from '@/store/api/userApi';
import Link from 'next/link';
import React, { useState } from 'react'
import FriendListSkeleton from '../skeleton/FriendListSkeleton';

type UserIdProps = {
  userId: string | undefined
}

const HomeFriendList = ({ userId }: UserIdProps) => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetUsersQuery({ search });

  const userList = data?.filter((friend) => friend._id !== userId)

  return (
    <div className=''>
      <div className="top-20 sticky">
        <h4 className="text-bgColor text-lg font-semibold">All Yours</h4>

        {/* user search field */}
        <input className='w-full p-2 mt-2 text-sm border border-gray-400 rounded outline-none' type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} placeholder='Search Your Friend' />

        <div className="h-[500px]  mt-3 custom_scrollbar">
          {isLoading ?
            <FriendListSkeleton /> :
            isError ?
              <div className="">Error</div> :
              userList?.length ?
                userList.map((user) => (
                  <Link key={user._id} href={`/profile?userId=${user._id}`} className="hover:bg-gray-200 dark:hover:bg-bgDarkHover flex items-center gap-4 px-1 mb-4 rounded">
                    <img className='object-cover w-10 h-10 rounded-full' src={user.profile.secure_url} alt="" />
                    <h3 className='text-sm font-semibold'>{user.name}</h3>
                  </Link>
                )) : null
          }
        </div>
      </div>
    </div>
  )
}

export default HomeFriendList