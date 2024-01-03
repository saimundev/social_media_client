import HomePostCreate from './HomePostCreate'
import PostCard from '../shared/PostCard'
import PostSkeleton from '../skeleton/PostSkeleton'
import Welcome from '../illustration-photo/Welcome'

type PostContentProps = {
    postData: any
    isLoading: boolean
    error: boolean
}

const HomeContent = ({ postData, isLoading, error }: PostContentProps) => {
    return (
        <div>
            <HomePostCreate />
            <div className="">
                {
                    isLoading ?
                        <PostSkeleton /> :
                        error ?
                            <div className="">Error</div> :
                            postData?.length ? postData?.map((post: any) => (
                                <PostCard cartData={post} key={post._id} />
                            )) : <div >
                                <Welcome className='w-full h-40 mt-10' />
                                <div className="mt-4 text-lg font-semibold text-center">
                                    You Have Not Create Any Post Yet
                                </div>

                            </div>}
            </div>

        </div>
    )
}

export default HomeContent