import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import CameraIcon from '../icon/CameraIcon'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDropzone } from 'react-dropzone'
import CloseIcon from '../icon/CloseIcon'
import { Button } from '../ui/button'
import { useUpdateCoverPhotoMutation, useUpdateProfilePhotoMutation } from '@/store/api/userApi'
import ProfileCoverSkeleton from '../skeleton/ProfileCoverSkeleton'
import { useAppSelector } from '@/store/hooks'
import { useCreateChatMutation } from '@/store/api/chatApi'

const ProfileCart = ({ profileData, isLoading, userId }: any) => {
  const [open, setOpen] = useState(false)
  const [coverPhotoOpen, setCoverPhotoOpen] = useState(false);
  const [postImage, setPostImage] = useState<any>(null);

  const [updateProfilePhoto, { isLoading: loading, isError, isSuccess }] = useUpdateProfilePhotoMutation()
  const [updateCoverPhoto, { isLoading: coverLoading, isError: error, isSuccess: success }] = useUpdateCoverPhotoMutation()

  const [createChat, { isSuccess: chatSuccess }] = useCreateChatMutation()


  const currentUser = useAppSelector((state) => state.auth.user)

  //profile photo update success message
  useEffect(() => {
    if (isSuccess) {
      setOpen(false)
    }
  }, [isSuccess])

  //cover photo update success message
  useEffect(() => {
    if (success) {
      setCoverPhotoOpen(false)
    }
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


  //handle update profile photo
  const handleUploadPhoto = () => {
    const formData = new FormData();
    formData.append("profile", postImage)

    // update profile photo api call
    updateProfilePhoto({ formData, userId })
  }

  // update cover  photo api call
  const handleUploadCoverPhoto = () => {
    const formData = new FormData();
    formData.append("cover", postImage)

    //update cover photo api call
    updateCoverPhoto({ formData, userId })
  }

  const handleChat = () => {
    const chat = {
      userId: currentUser?.id,
      friendId: userId
    }

    //api call
    createChat(chat)
  }

  if (isLoading) return <ProfileCoverSkeleton />
  return (
    <div className="rounded">
      <div className="relative">
        <img className='h-52 object-cover w-full rounded' src={profileData?.user?.cover?.secure_url || "https://e0.pxfuel.com/wallpapers/137/952/desktop-wallpaper-facebook-cover-love-lovely-nice-cool-touch-beauty.jpg"} alt="cover_photo" />
        {userId === currentUser?.id && <div onClick={() => setCoverPhotoOpen(true)} className="bg-black/80 bottom-2 right-2 absolute flex gap-2 px-4 py-2 text-sm font-semibold text-white rounded cursor-pointer">
          <CameraIcon className='w-5 h-5 text-white' />
          Edit cover photo
        </div>}
        {userId !== currentUser?.id && <div onClick={handleChat} className="-bottom-14 absolute right-0">
          <Button size="lg" className='hover:bg-black bg-black'>Message</Button>
        </div>}
        <Dialog open={coverPhotoOpen} onOpenChange={setCoverPhotoOpen}>
          <DialogContent className='dark:bg-bgDark dark:border-none bg-white border border-gray-200 shadow'>
            <DialogHeader>
              <DialogTitle className='text-xl font-bold text-center'>Upload cover Photo</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className=" relative mt-8">
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
              <Button disabled={coverLoading} className='w-full mt-4' size="lg" onClick={handleUploadCoverPhoto}>{coverLoading ? "Uploading..." : "Upload"}</Button>
            </DialogDescription>
          </DialogContent >
        </Dialog>

        <div className="flex items-center absolute bottom-[-80px] left-[50%] translate-x-[-50%]">

          {/* profile photo  */}
          <div className="relative">
            <img className="object-cover w-40 h-40 rounded-full" src={profileData?.user.profile.secure_url} alt="profile" />
            {userId === currentUser?.id && <div onClick={() => setOpen(true)} className="right-1 bottom-1 absolute p-2 bg-gray-200 rounded-full cursor-pointer">
              <CameraIcon className='w-6 h-6 text-black' />
            </div>}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className='dark:bg-bgDark dark:border-none bg-white border border-gray-200 shadow'>
                <DialogHeader>
                  <DialogTitle className='text-xl font-bold text-center'>Upload Photo</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <div className=" relative mt-8">
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
                  <Button disabled={isLoading} className='w-full mt-4' size="lg" onClick={handleUploadPhoto}>{loading ? "Uploading..." : "Upload"}</Button>
                </DialogDescription>
              </DialogContent >
            </Dialog>
          </div>
          <div className="mt-16 ml-2">
            <h2 className='text-xl font-semibold'>{profileData?.user.name}</h2>

            <Link className='text-bgColor hover:underline font-semibold' href="#">Your Friends: {profileData?.user.friends.length}</Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCart