"use client";

import HomeContent from "@/components/home/HomeContent";
import HomeFriendList from "@/components/home/HomeFriendList";
import HomeSidebar from "@/components/home/HomeSidebar";
import Container from "@/components/shared/Container";
import Header from "@/components/shared/Header";
import { useGetTimeLinePostQuery } from "@/store/api/postAPi";
import { useAppSelector } from "@/store/hooks";

export default function HomePage() {
  const user = useAppSelector((state) => state.auth.user)
  const { data, isLoading, isError } = useGetTimeLinePostQuery({ userId: user?.id })

  return (
    <main>
      <Header />
      {/* main content */}
      <Container>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 mt-4">
          <HomeSidebar userId={user?.id} />
          <HomeContent postData={data?.timeLinePost} isLoading={isLoading} error={isError} />
          <HomeFriendList userId={user?.id} />
        </div>
      </Container>
    </main>
  );
}
