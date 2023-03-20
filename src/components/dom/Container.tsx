import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Container = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(`
        container
        py-5
        ${className}
      `)}
      {...props}>
      {children}
    </div>
  )
}

export default Container
