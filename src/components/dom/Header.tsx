import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import Container, { widthVariables } from './Container'

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  width: keyof typeof widthVariables
}

const Header = ({ children, width, className = '', ...props }: HeaderProps) => {
  return (
    <header
      className={twMerge(`
        py-[20px]
        border-b
        border-black
        ${width === 'full' ? 'px-[40px]' : ''}
        ${className}
      `)}
      {...props}>
      <Container width={width}>{children}</Container>
    </header>
  )
}

export default Header
