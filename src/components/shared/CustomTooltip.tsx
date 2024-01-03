import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type TooltipProps = {
    children: React.ReactNode
    className?: string
    message: string
}


const CustomTooltip = ({ children, className, message }: TooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={className}>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{message}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip