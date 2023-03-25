import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Body = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={twMerge(`text-sm font-semibold py-[10px] lg:py-[30px] ${className} flex-1 overflow-auto`)}>
      {children}
    </div>
  )
}

export default Body
