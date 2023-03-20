import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'

const Header = ({ children, className = '', ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <header
      className={twMerge(`
        py-[20px]
        border-b
        border-black
        z-[1]
        sticky
        top-0
        ${className}
      `)}
      {...props}>
      <Container className='py-0'>{children}</Container>
    </header>
  )
}

export default Header
