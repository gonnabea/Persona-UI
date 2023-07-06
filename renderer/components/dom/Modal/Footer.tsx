import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Footer = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={twMerge(`text-sm font-semibold ${className}`)}>{children}</div>
}

export default Footer
