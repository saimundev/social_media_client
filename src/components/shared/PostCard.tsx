"use client";

import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import LoveOutlineIcon from '../icon/LoveOutlineIcon'
import LoveSolidIcon from '../icon/LoveSolidIcon'
import CommentSolidIcon from '../icon/CommentSolidIcon'
import moment from "moment"
import { useCommentPostMutation, useDeletePostMutation, useLikePostMutation, useUpdatePostMutation } from '@/store/api/postAPi';
import { useAppSelector } from '@/store/hooks';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ShareIcon from '../icon/ShareIcon';
import SendIcon from '../icon/SendIcon';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CopyIcon } from 'lucide-react';
import CheckIcon from '../icon/CheckIcon';
import SpinIcon from '../icon/SpinIcon';
import Link from 'next/link';
import { useGetUserQuery } from '@/store/api/userApi';
import EllipsisVerticalIcon from '../icon/EllipsisVerticalIcon';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDropzone } from 'react-dropzone'
import CloseIcon from '../icon/CloseIcon';

const PostCard = ({ cartData = {}, currentUserId = "" }: any) => {
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState<any>(null);
    const [comment, setComment] = useState("")
    const [copy, setCopy] = useState(false);
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user)
    const userId = user?.id
    const { data } = useGetUserQuery({ userId: user?.id })


    const [likePost, { isError }] = useLikePostMutation()
    const [commentPost, { isError: error, isLoading }] = useCommentPostMutation();
    const [deletePost, { isSuccess }] = useDeletePostMutation()
    const [updatePost, { isLoading: loading, isSuccess: success }] = useUpdatePostMutation()

    useEffect(() => {
        setTimeout(() => {
            setCopy(false);
        }, 1000)
    }, [copy])

    useEffect(() => {
        setPostText(cartData?.postText)
    }, [cartData])

    useEffect(() => {
        setUpdateOpen(false);
    }, [success])



    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles) {
            setPostImage(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "image/png": [".png"],
        },
        maxFiles: 1,
        maxSize: 5242880

    })

    const rejectionFile = fileRejections[0]?.errors?.map((error) => {
        return error.message
    })

    const handleLikePost = (id: string) => {
        if (userId) {
            likePost({ userId, postId: id })
        }
    }

    const handleComment = (id: string) => {
        if (userId && comment) {
            commentPost({ postId: id, comment, commentBy: userId })
        }

        //clear comment input
        setComment("")
    }

    const handleCopyShareLink = (link: string) => {
        navigator.clipboard.writeText(`http://localhost:get-post/${cartData._id}`)
        setCopy(true)
    }

    const handleDeletePost = (id: string) => {
        deletePost(id)
    }

    //handle post
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check post image or post message 
        if (!postText && !postImage) return;

        const formData = new FormData();
        formData.append("postImage", postImage)
        formData.append("postText", postText)

        //update api call
        updatePost({ formData, postId: cartData?._id })

    }


    return (
        <div className='dark:bg-bgDark dark:border-none py-4 mb-6 bg-white border border-gray-200 rounded shadow'>
            {/* user profile */}
            <div className="flex justify-between px-4">
                <div className=" flex gap-4">
                    <Avatar asChild className='w-12 h-12'>
                        <Link href={`/profile?userId=${cartData.postBy?._id}`}>
                            <AvatarImage src={cartData?.postBy?.profile.secure_url} />
                            <AvatarFallback>P</AvatarFallback>
                        </Link>
                    </Avatar>
                    <div className="">
                        <Link href={`/profile?userId=${cartData.postBy?._id}`}> <h4 className="font-semibold">{cartData?.postBy?.name}</h4></Link>
                        <p className="text-gray-500">{moment(cartData?.createdAt).fromNow()}</p>
                    </div>
                </div>

                {userId === currentUserId && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="place-items-center dark:bg-black grid w-8 h-8 bg-gray-200 rounded-full cursor-pointer">
                                <EllipsisVerticalIcon className=' w-5 h-5' />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => setUpdateOpen(true)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='cursor-pointer' onClick={() => handleDeletePost(cartData?._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>


                    </DropdownMenu>


                )}

                <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                    <DialogContent className='dark:bg-bgDark bg-white border border-gray-200 shadow'>
                        <DialogHeader>
                            <DialogTitle className='text-xl font-bold text-center'>Update Post</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>


                            {/* post create start here  */}
                            <form onSubmit={handleSubmit}>
                                <textarea value={postText} name="" id="" onChange={(e) => setPostText(e.target.value)} placeholder="Update Your Post" className='placeholder:text-gray-600 dark:text-gray-400 w-full h-16 p-2 mt-4 text-xl text-black rounded-lg outline-none'></textarea>

                                {/* file upload handle */}
                                <div className=" relative mt-2">
                                    {postImage ? <div className="">
                                        <img src={postImage && URL.createObjectURL(postImage)} alt="Image_preview" className='w-full rounded h-[300px] object-cover' />
                                        <div onClick={() => setPostImage(null)} className="bg-black/70 top-1 right-1 absolute p-1 rounded-full cursor-pointer"> <CloseIcon className='w-6 h-6 text-white' /></div>
                                    </div> : <div {...getRootProps()} >
                                        <input  {...getInputProps()} />
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className={`bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex flex-col items-center justify-center w-full h-56 border-2  border-dashed rounded-lg cursor-pointer ${rejectionFile ? "border-red-500" : "border-gray-300"}`}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="dark:text-gray-400 w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="dark:text-gray-400 mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="dark:text-gray-400 text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>

                                            </label>
                                        </div>

                                    </div>}
                                </div>
                                <div className="mt-1 text-sm text-red-500">{rejectionFile ? rejectionFile : null}</div>

                                <Button disabled={loading} className='w-full mt-2'>{loading ? "Loading" : "Update"}</Button>


                            </form>

                        </DialogDescription>
                    </DialogContent >

                </Dialog>
            </div>

            {/* user post */}
            <div className="">
                <h2 className=' px-4 py-2 mt-3 mb-2 text-xl font-medium'>{cartData.postText}</h2>
                {cartData.postImage ? <img className="h-80 object-cover w-full rounded" src={cartData.postImage.secure_url} alt="post_image" /> : null}
                <div className="">

                </div>
            </div>

            <div className="px-4 mt-8">
                <div className="dark:border-gray-500 flex justify-between px-4 py-1 border-t border-gray-300">
                    <div className="dark:border-gray-500 flex items-center gap-1">

                        <Dialog>
                            <DialogTrigger>
                                <div className="hover:bg-gray-200 flex items-center gap-2 px-4 py-1 rounded cursor-pointer">
                                    <LoveSolidIcon className='w-5 h-5 text-red-500' />
                                    <span className='text-sm text-gray-500'>{cartData.likes?.length}</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl dark:bg-bgDark">
                                <DialogHeader>
                                    <DialogTitle>Love Your Post</DialogTitle>
                                    <DialogDescription>
                                        any one can see the post love react
                                    </DialogDescription>
                                </DialogHeader>

                                {/* like render here */}
                                <div className="min-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-bgDark
                                dark:[&::-webkit-scrollbar-thumb]:bg-bgDarkHover ">
                                    {cartData.likes?.length ? cartData.likes.map((like: any) => (
                                        <div key={like._id} className="last:border-none dark:border-gray-500 mt-4 border-b border-gray-200">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex gap-4">
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage src={like.likeBy.profile?.secure_url} alt="profile" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                    <div className="font-medium">{like.likeBy.name}</div>
                                                </div>

                                                <Button asChild variant="link" className='text-sm text-gray-500'>
                                                    <Link href={`/profile?userId=${like.likeBy._id}`}>View Profile</Link>
                                                </Button>
                                            </div>

                                        </div>
                                    )) : <div className="text-sm">No Likes Yet</div>}
                                </div>

                            </DialogContent>
                        </Dialog>


                    </div>

                    <div className="hover:bg-gray-200 flex items-center gap-1 px-4 py-1 rounded cursor-pointer" onClick={() => setOpen(true)}>
                        <CommentSolidIcon className='w-5 h-5 text-gray-600' />
                        <span className='text-sm text-gray-500'>{cartData.comments?.length}</span>
                    </div>
                </div>
            </div>

            {/* like and comment post */}
            <div className="px-4">
                <div className="border-y dark:border-gray-500 flex w-full border-gray-300">
                    <div onClick={() => handleLikePost(cartData._id)} className="hover:bg-gray-100 dark:hover:bg-bgDarkHover flex items-center justify-center flex-1 gap-2 py-1 cursor-pointer">
                        {cartData.likes?.find((like: any) => like.like === userId) ? <LoveSolidIcon className="w-6 h-6 text-red-500" /> : <LoveOutlineIcon className="w-6 h-6 text-gray-500" />}
                        <span className='text-sm font-medium'>Love</span>
                    </div>

                    {/* comment button */}
                    <div className="hover:bg-gray-100 dark:hover:bg-bgDarkHover flex items-center justify-center flex-1 gap-2 py-1 cursor-pointer">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger>
                                <div className="flex items-center gap-2">
                                    <CommentSolidIcon className="w-6 h-6 text-gray-500" />
                                    <span className='text-sm font-medium'>Comment</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl dark:bg-bgDark">
                                <DialogHeader>
                                    <DialogTitle>Comments</DialogTitle>
                                    <DialogDescription>
                                        any one can see the post comment
                                    </DialogDescription>
                                </DialogHeader>

                                {/* comment render here */}
                                <div className="min-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2
                         [&::-webkit-scrollbar-track]:rounded-full
                         [&::-webkit-scrollbar-track]:bg-gray-100
                         [&::-webkit-scrollbar-thumb]:rounded-full
                         [&::-webkit-scrollbar-thumb]:bg-gray-300
                         dark:[&::-webkit-scrollbar-track]:bg-bgDark
                         dark:[&::-webkit-scrollbar-thumb]:bg-bgDarkHover px-2">
                                    {cartData.comments?.length ? cartData.comments.map((comment: any) => (
                                        <div className="last:border-none dark:border-gray-500 mt-4 border-b border-gray-200" key={comment._id}>
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage src={comment.commentBy.profile.secure_url} alt="Profile" />
                                                        <AvatarFallback>P</AvatarFallback>
                                                    </Avatar>
                                                    <div className="font-medium">{comment.commentBy.name}</div>
                                                </div>

                                                <Button asChild variant="link" className='text-sm text-gray-500'>
                                                    <Link href={`/profile?userId=${comment.commentBy._id}`}>View Profile</Link>
                                                </Button>
                                            </div>
                                            <div className="p-2">
                                                <p className='text-lg font-medium'>{comment.comment}</p>
                                                <div className="mt-1 text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</div>
                                            </div>


                                        </div>
                                    )) : <div className="text-sm">No Comments Yet</div>}
                                </div>

                            </DialogContent>
                        </Dialog>

                    </div>

                    {/* share button */}
                    <div className="hover:bg-gray-100 dark:hover:bg-bgDarkHover flex items-center justify-center flex-1 gap-2 py-1 cursor-pointer">
                        <Dialog>
                            <DialogTrigger>
                                <div className="flex items-center gap-2">
                                    <ShareIcon className="w-6 h-6 text-gray-500" />
                                    <span className='text-sm font-medium'>Share</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg dark:bg-bgDark">
                                <DialogHeader>
                                    <DialogTitle>Share link</DialogTitle>
                                    <DialogDescription>
                                        Anyone who has this link will be able to view this.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="link" className="sr-only">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            defaultValue={`http://localhost:get-post/${cartData._id}`}
                                            readOnly
                                        />
                                    </div>
                                    <Button onClick={() => handleCopyShareLink(cartData._id)} type="submit" size="sm" className="px-3">

                                        {copy ? <span ><CheckIcon className='w-4 h-4 text-white' /></span> : <CopyIcon className="w-4 h-4" />}
                                    </Button>
                                </div>

                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>

            {/* comment text box */}
            <div className="flex items-center gap-4 px-4 mt-2">
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={data?.user?.profile?.secure_url} alt="Profile" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comments...' className='dark:border-gray-500 w-full p-2 text-sm border border-gray-200 rounded-full outline-none' />
                <div onClick={() => handleComment(cartData._id)} className="hover:bg-gray-200 flex items-center p-2 rounded-full cursor-pointer">
                    {isLoading ? <SpinIcon /> : <SendIcon className='w-6 h-6 text-gray-500' />
                    }



                </div>
            </div>
        </div>
    )
}

export default PostCard