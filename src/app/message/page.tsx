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
import { Input } from '@/components/ui/input';
import SendIcon from '@/components/icon/SendIcon';
import Conversation from '@/components/message/Message';
import Message from '@/components/message/Message';
import { useGetChatQuery } from '@/store/api/chatApi';
import { useGetMessageQuery, useSendMessageMutation } from '@/store/api/messageApi';
import { useState } from 'react';
import Conversion from '@/components/illustration-photo/Conversion';

type SearchParamsProps = {
    searchParams: {
        Id: string
        chatId: string
    }
}


const MessagePage = ({ searchParams: { Id, chatId } }: SearchParamsProps) => {
    const [text, setText] = useState("");
    const user = useAppSelector((state) => state.auth.user)
    const { data, isLoading, isError } = useGetUserQuery({ userId: Id });
    const { data: chatData } = useGetChatQuery({ userId: user?.id })
    const { data: messageData } = useGetMessageQuery({ chatId })
    const [sendMessage] = useSendMessageMutation()

    const handleMessage = () => {
        const message = {
            text,
            senderId: user?.id,
            chatId
        }

        // send message api call
        sendMessage(message)

        //clear message input
        setText("");
    }

    return (
        <div>
            <Header />
            <Container>
                <div className="grid-cols-[1fr_2fr_1fr]  grid  h-[calc(100vh-64px)]">
                    {/* friend list */}
                    <div className="dark:border-bgDarkHover px-2 mt-2 space-y-2 border-r border-gray-200 shadow">
                        {chatData?.map((chat: any) => (
                            <FriendMessageList chat={chat} currentUserId={user?.id} />
                        ))}

                    </div>

                    {/* conversation */}

                    {chatId && Id ? <div className="grid content-between px-2 py-4">
                        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-130px)]
                         [&::-webkit-scrollbar]:w-2
                         [&::-webkit-scrollbar-track]:rounded-full
                         [&::-webkit-scrollbar-track]:bg-gray-100
                         [&::-webkit-scrollbar-thumb]:rounded-full
                         [&::-webkit-scrollbar-thumb]:bg-gray-300
                         dark:[&::-webkit-scrollbar-track]:bg-bgDark
                         dark:[&::-webkit-scrollbar-thumb]:bg-bgDarkHover
                        ">
                            {messageData?.map((message: any) => (
                                <Message message={message} ownMessage={message.senderId === user?.id} friendProfile={data} />
                            ))}
                        </div>

                        {/* message send */}
                        <div className="flex items-center gap-2">
                            <Input placeholder='White Something...'
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                                className='font-semibold rounded-full' />
                            <div onClick={handleMessage} className="p-2 border border-gray-200 rounded-full cursor-pointer">
                                <SendIcon className='w-6 h-6' />
                            </div>
                        </div>
                    </div>
                        : <div className="place-items-center grid text-2xl font-medium text-gray-400">
                            <div className="">
                                <Conversion className=' w-80 h-80 mx-auto' />
                                Chose A Friend And Start Conversion
                            </div>
                        </div>}


                    {/* friend profile */}

                    {chatId && Id && <div className="dark:border-bgDarkHover border-l border-gray-200">
                        <div className="top-20 sticky">
                            <Avatar className='w-28 h-28 mx-auto'>
                                <AvatarImage src={data?.user?.profile?.secure_url} alt={data?.user?.name} />
                                <AvatarFallback>{data?.user?.name}</AvatarFallback>
                            </Avatar>
                            <h3 className='dark:text-white mt-2 text-lg font-semibold text-center text-gray-600'>{data?.user?.name}</h3>
                            <div className="flex justify-center">
                                <Button variant="link">
                                    <Link href={`/profile?userId=${data?.user?._id}`}>View Profile</Link>
                                </Button>
                            </div>
                        </div>

                    </div>}
                </div>
            </Container>
        </div>
    )
}

export default MessagePage