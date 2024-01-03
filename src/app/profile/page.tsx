"use client";
import ProfileCart from '@/components/profile/ProfileCart'
import ProfileFriend from '@/components/profile/ProfileFriend';
import ProfilePost from '@/components/profile/ProfilePost'
import ProfileSidebar from '@/components/profile/ProfileSideBar'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header';
import { useGetUserQuery } from '@/store/api/userApi'


type SearchParamsProps = {
  searchParams: {
    userId: string
  }
}

const ProfilePage = ({ searchParams }: SearchParamsProps) => {
  const userId = searchParams.userId
  const { data, isLoading } = useGetUserQuery({ userId })

  return (
    <div>
      <Header />
      <Container>
        <ProfileCart profileData={data} isLoading={isLoading} userId={userId} />
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 mt-28 ">
          <ProfileSidebar profileInfo={data} userId={userId} profileSideBarLoading={isLoading} />
          <ProfilePost userId={userId} />
          <ProfileFriend currentUser={userId} userData={data?.user} />
        </div>
      </Container>
    </div>
  )
}

export default ProfilePage