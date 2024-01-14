import NotFound from '@/components/illustration-photo/NotFound'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='place-items-center grid h-screen'>
            <div className='text-center'>
                <NotFound className='w-[500px] h-[400px]' />
                <Button asChild variant="link">
                    <Link href="/">Back to home page</Link>
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage