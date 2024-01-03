import { IconProps } from '@/types/IconProps'
import React from 'react'

const ShareIcon = ({ className, ...props }: IconProps) => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><polyline points="15 17 20 12 15 7" /><path d="M4 18v-2a4 4 0 0 1 4-4h12" /></svg>
        </div>
    )
}

export default ShareIcon