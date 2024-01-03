import { IconProps } from '@/types/IconProps'
import React from 'react'

const CheckIcon = ({ className, ...props }: IconProps) => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>

        </div>
    )
}

export default CheckIcon