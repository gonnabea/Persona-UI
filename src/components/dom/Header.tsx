import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  containerClassName?: string
}

const Header = ({ children, className = '', containerClassName = '', ...props }: HeaderProps) => {
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
      <Container
        className={twMerge(`
          py-0 ${containerClassName}
        `)}>
        {children}
      </Container>
    </header>
  )
}

export default Header
