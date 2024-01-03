"use client";

import HomePostCreate from '../home/HomePostCreate'
import PostCard from '../shared/PostCard'
import { useGetPostByUserQuery } from '@/store/api/postAPi'
import PostSkeleton from '../skeleton/PostSkeleton'
import { useAppSelector } from '@/store/hooks'
import NoData from '../illustration-photo/NoData'

const ProfilePost = ({ userId = "" }: { userId: string | undefined }) => {
  const { data, isLoading, isError } = useGetPostByUserQuery({ userId })
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div>
      {userId === user?.id && <HomePostCreate />}
      {isLoading ?
        <PostSkeleton /> :
        isError ?
          <div className="">Error</div> :
          data?.length ?
            data?.map((post, index) => (
              <PostCard key={index} cartData={post} currentUserId={userId} />
            )) :
            <div className="mt-10">
              <NoData className="h-40" />
              <div className="dark:text-white mt-6 text-lg font-semibold text-center text-black"> No Post Create Yet</div>
            </div>}
    </div>
  )
}

export default ProfilePost