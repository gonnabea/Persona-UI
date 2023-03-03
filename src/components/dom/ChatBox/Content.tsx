import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Content = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(`
            bg-black
            rounded-full
            px-[20px]
            py-[12px]
            mt-[10px]
            bg-opacity-50
            first-of-type:bg-primary-200
            first-of-type:bg-opacity-70
        `)}
      {...props}>
      {children}
    </div>
  )
}

export default Content
