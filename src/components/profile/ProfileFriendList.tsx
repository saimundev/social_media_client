import React from 'react'
import { Card, CardContent } from '../ui/card'

const ProfileFriendList = () => {
    return (
        <div className="">
            <div className="grid grid-cols-2 gap-4">
                <Card className='flex items-center p-4 flex-col'>
                    <img className="w-14 h-14 rounded-full object-cover" src="https://res.cloudinary.com/saimun/image/upload/v1684076448/social_media/f1qf86xtd8llrnzujg18.png" alt="" />
                    <h3 className="font-medium text-sm mt-2">Saimun islam</h3>
                </Card>

                <Card className='flex items-center p-4 flex-col'>
                    <img className="w-14 h-14 rounded-full object-cover" src="https://res.cloudinary.com/saimun/image/upload/v1684076448/social_media/f1qf86xtd8llrnzujg18.png" alt="" />
                    <h3 className="font-medium text-sm mt-2">Saimun islam</h3>
                </Card>
            </div>
        </div>
    )
}

export default ProfileFriendList