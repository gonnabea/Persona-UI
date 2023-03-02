import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Body = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={twMerge(`text-sm font-semibold py-[30px] ${className}`)}>{children}</div>
}

export default Body
