"use client";

import FriendMessageList from '@/components/message/FriendMessageList'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import { useGetUserQuery } from '@/store/api/userApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import SendIcon from '@/components/icon/SendIcon';
import Message from '@/components/message/Message';
import { useGetChatQuery } from '@/store/api/chatApi';
import { useGetMessageQuery, useSendMessageMutation } from '@/store/api/messageApi';
import { useEffect, useRef, useState } from 'react';
import Conversion from '@/components/illustration-photo/Conversion';
import { io } from "socket.io-client";
import { onlineUsers } from '@/store/features/authSlice';
import Loading from '@/components/shared/Loading';

type SearchParamsProps = {
    searchParams: {
        Id: string
        chatId: string
    }
}


const MessagePage = ({ searchParams: { Id, chatId } }: SearchParamsProps) => {
    const [text, setText] = useState("");
    const [socket, setSocket] = useState<any>(null)
    const [newMessage, setNewMessage] = useState<any>([]);
    const user = useAppSelector((state) => state.auth.user)
    const { data, isError } = useGetUserQuery({ userId: Id });
    const { data: chatData } = useGetChatQuery({ userId: user?.id })
    const { data: messageData } = useGetMessageQuery({ chatId })
    const [sendMessage, { isLoading }] = useSendMessageMutation()
    const { onlineUser } = useAppSelector((state) => state.auth)
    const scrollRef = useRef<null | HTMLDivElement>(null)
    const dispatch = useAppDispatch();



    //scroll into the last message
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [newMessage])


    // socket connection
    useEffect(() => {
        const newSocket = io("https://social-media-socket-7mrs.onrender.com/")
        setSocket(newSocket)
    }, [])

    // add online user
    useEffect(() => {
        if (socket === null) return
        socket.emit("addUser", user?.id)
        socket.on("getUser", (user: any) => {
            dispatch(onlineUsers(user))
        })
    }, [user, socket])

    // set database message in state
    useEffect(() => {
        setNewMessage(messageData)
    }, [messageData])

    // get current message
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", (data: any) => {
            if (chatId !== data.chatId) return
            setNewMessage((prev: any) => [...prev, data])
        })
    }, [socket, user])



    //send message 
    const handleMessage = () => {
        const message = {
            text,
            senderId: user?.id,
            chatId
        }

        // const receiver = chatData?.members?.find((member: any) => member !== user?.id)

        socket.emit("sendMessage", { ...message, receiverId: Id })

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
                    <div className="dark:border-bgDarkHover custom_scrollbar h-full px-2 space-y-2 border-r border-gray-200 shadow">
                        {chatData?.length ? chatData?.map((chat: any) => (
                            <FriendMessageList chat={chat} currentUserId={user?.id} onlineUser={onlineUser} />
                        )) : <div className="text-sm">No Conversation Yet</div>}

                    </div>

                    {/* conversation */}

                    {chatId && Id ? <div className="grid content-between pb-2">
                        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-130px)]
                         [&::-webkit-scrollbar]:w-2
                         [&::-webkit-scrollbar-track]:rounded-full
                         [&::-webkit-scrollbar-track]:bg-gray-100
                         [&::-webkit-scrollbar-thumb]:rounded-full
                         [&::-webkit-scrollbar-thumb]:bg-gray-300
                         dark:[&::-webkit-scrollbar-track]:bg-bgDark
                         dark:[&::-webkit-scrollbar-thumb]:bg-bgDarkHover
                        ">
                            {newMessage?.map((message: any) => (
                                <div ref={scrollRef}>
                                    <Message message={message} ownMessage={message.senderId === user?.id} friendProfile={data} />
                                </div>
                            ))}
                        </div>

                        {/* message send */}
                        <div className="flex items-center gap-2 px-2">
                            <Input placeholder='White Something...'
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                                className='font-semibold rounded-full' />
                            {isLoading ? <Loading className='w-8 h-8' /> : <div onClick={handleMessage} className="p-2 border border-gray-200 rounded-full cursor-pointer">
                                <SendIcon className='w-6 h-6' />
                            </div>}
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
                            <div className="w-28 h-28 relative mx-auto">
                                <Avatar className='w-28 h-28 mx-auto'>
                                    <AvatarImage src={data?.user?.profile?.secure_url} alt={data?.user?.name} />
                                    <AvatarFallback>{data?.user?.name}</AvatarFallback>

                                </Avatar>
                                <div className="absolute bottom-0 left-[50%] mt-2 text-sm text-center">
                                    {onlineUser?.some((online: any) => online.userId === Id) ? <span className=" px-4 py-1 text-white bg-green-500 rounded-full">Online</span> : <span className="px-4 py-1 text-white bg-red-500 rounded-full">offline</span>}
                                </div>
                            </div>
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