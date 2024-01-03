"use client";

import Container from '@/components/shared/Container';
import Header from '@/components/shared/Header'
import { useGetVideoQuery } from '@/store/api/postAPi'
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import VideoCartSkeleton from '@/components/skeleton/VideoCartSkeleton';

const VideoPage = () => {
    const { data, isLoading, isError } = useGetVideoQuery([])
    return (
        <div>
            <Header />
            <Container className='mt-10'>
                <h2 className='text-lg font-semibold text-center'>Enjoy The Random Video</h2>
                {isLoading ?
                    <VideoCartSkeleton /> :
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {data?.map((video) => (
                            <div className="dark:border-none dark:bg-bgDark border border-gray-200 shadow">
                                <MediaPlayer title="Sprite Fight" src={video.videoUrl}>
                                    <MediaProvider />
                                    <DefaultVideoLayout thumbnails={video.thumbnailUrl} icons={defaultLayoutIcons} />
                                </MediaPlayer>
                                <div className="p-2">
                                    <h4 className='text-sm font-medium'>{video.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>}
            </Container>

        </div>
    )
}

export default VideoPage