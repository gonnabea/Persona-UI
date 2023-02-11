import { HTMLAttributes } from 'react'

const Footer = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className='text-sm font-semibold'>{children}</div>
}

export default Footer
