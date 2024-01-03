import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type ChildrenProps = {
    children:ReactNode
    className?:string
}

const Container = ({children,className}:ChildrenProps) => {
  return (
    <div className={cn("px-16",className)}>
        {children}
    </div>
  )
}

export default Container