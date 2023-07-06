import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Container = ({ children, className = '' }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(`
        bg-white
        p-[10px]
        lg:p-[30px]
        rounded-[20px]
        flex
        flex-col
        h-[90%]
        w-[90%]
        lg:h-auto
        lg:w-auto
        fixed
        ${className}
      `)}>
      {children}
    </div>
  )
}

export default Container
