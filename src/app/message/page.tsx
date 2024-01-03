"use client";

import FriendMessageList from '@/components/message/FriendMessageList'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import { useGetUserQuery } from '@/store/api/userApi';
import { useAppSelector } from '@/store/hooks';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SearchParamsProps = {
    searchParams: {
        Id: string
    }
}


const MessagePage = ({ searchParams: { Id } }: SearchParamsProps) => {
    const user = useAppSelector((state) => state.auth.user)

    const { data, isLoading, isError } = useGetUserQuery({ userId: Id });
    return (
        <div>
            <Header />
            <Container>
                <div className="grid-cols-[1fr_2fr_1fr] grid h-screen">
                    {/* friend list */}
                    <div className=" border-r border-gray-200 shadow">
                        <FriendMessageList userId={user?.id} />
                    </div>

                    {/* conversation */}
                    <div className="">

                    </div>
                    {/* friend profile */}

                    <div className="border-l border-gray-200">
                        <div className="top-20 sticky">
                            <Avatar className='w-28 h-28 mx-auto'>
                                <AvatarImage src={data?.user?.profile?.secure_url} alt={data?.user?.name} />
                                <AvatarFallback>{data?.user?.name}</AvatarFallback>
                            </Avatar>
                            <h3 className='mt-2 text-lg font-semibold text-center text-gray-600'>{data?.user?.name}</h3>
                            <div className="flex justify-center">
                                <Button variant="link">
                                    <Link href={`/profile?userId=${data?.user?._id}`}>View Profile</Link>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MessagePage