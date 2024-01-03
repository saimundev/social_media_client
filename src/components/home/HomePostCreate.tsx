"use client"

import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDropzone } from 'react-dropzone'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import CloseIcon from '../icon/CloseIcon'
import { useCreatePostMutation } from '@/store/api/postAPi'
import { useToast } from "@/components/ui/use-toast";
import { useGetUserQuery } from '@/store/api/userApi'
import { useAppSelector } from '@/store/hooks'
const HomePostCreate = () => {
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState<any>(null);
    const [open, setOpen] = useState(false)
    const user = useAppSelector((state) => state.auth.user)

    const [createPost, { isLoading, error, isSuccess }] = useCreatePostMutation();
    const { data } = useGetUserQuery({ userId: user?.id })
    const { toast } = useToast();

    //error message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive",
            });
        }
    }, [error]);


    //success message
    useEffect(() => {
        if (isSuccess) {
            //close post dialog
            setOpen(false)
        }
    }, [isSuccess]);

    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles) {
            setPostImage(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        multiple: false,

        maxFiles: 1,
        maxSize: 5242880

    })

    const rejectionFile = fileRejections[0]?.errors?.map((error) => {
        return error.message
    })

    //handle post
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check post image or post message 
        if (!postText && !postImage) return;

        const formData = new FormData();
        formData.append("postImage", postImage)
        formData.append("postText", postText)
        createPost(formData)

    }

    return (
        <div>
            <div className="dark:bg-bgDark dark:border-none flex items-center gap-4 px-4 py-6 mb-6 border border-gray-200 rounded shadow">

                <Avatar>
                    <AvatarImage src={data?.user?.profile?.secure_url} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className='hover:bg-gray-300 dark:bg-black/25  w-full px-3 py-2.5 text-gray-500 bg-gray-200 rounded-full cursor-pointer text-left'>
                        What is on your mind?
                    </DialogTrigger>
                    <DialogContent className='dark:bg-bgDark dark:border-none bg-white border border-gray-200 shadow'>
                        <DialogHeader>
                            <DialogTitle className='text-xl font-bold text-center'>Create post</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={data?.user?.profile?.secure_url} />
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <p className='dark:text-white text-sm font-semibold text-black capitalize'>{data?.user?.name}</p>
                            </div>

                            {/* post create start here  */}
                            <form onSubmit={handleSubmit}>
                                <textarea name="" id="" onChange={(e) => setPostText(e.target.value)} placeholder="What's on your mind?" className='placeholder:text-gray-600 dark:placeholder:text-gray-500 dark:text-white dark:rounded-lg w-full h-16 p-2 mt-4 text-xl text-black rounded outline-none'></textarea>

                                {/* file upload handle */}
                                <div className=" relative mt-4">
                                    {postImage ? <div className="">
                                        <img src={postImage && URL.createObjectURL(postImage)} alt="Image_preview" className='w-full rounded h-[300px] object-cover' />
                                        <div onClick={() => setPostImage(null)} className="bg-black/70 top-1 right-1 absolute p-1 rounded-full cursor-pointer"> <CloseIcon className='w-6 h-6 text-white' /></div>
                                    </div> : <div {...getRootProps()} >
                                        <input  {...getInputProps()} />
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className={`bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex flex-col items-center justify-center w-full h-56 border-2  border-dashed rounded-lg cursor-pointer ${rejectionFile ? "border-red-500" : "border-gray-300"}`}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="dark:text-gray-400 w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="dark:text-gray-400 mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="dark:text-gray-400 text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>

                                            </label>
                                        </div>

                                    </div>}
                                </div>
                                <div className="mt-1 text-sm text-red-500">{rejectionFile ? rejectionFile : null}</div>

                                <Button disabled={isLoading} className='w-full mt-2'>{isLoading ? "Loading" : "Post"}</Button>


                            </form>

                        </DialogDescription>
                    </DialogContent >

                </Dialog>

            </div>
        </div >
    )
}

export default HomePostCreate