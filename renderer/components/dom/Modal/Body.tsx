import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Body = ({ children, className = '' }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={twMerge(`text-sm font-semibold py-[10px] lg:py-[30px] flex-1 overflow-auto ${className}`)}>
      {children}
    </div>
  )
}

export default Body
