import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ScrollBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element
  className?: string
}

const ScrollBox = forwardRef<HTMLDivElement, ScrollBoxProps>(({ children, className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(`
        bg-gray-100
        overflow-y-scroll
        overflow-x-auto
        p-[20px]
        ${className}
      `)}>
      {children}
    </div>
  )
})

ScrollBox.displayName = 'ScrollBox'

export default ScrollBox
