import { HTMLAttributes } from 'react'
import Container, { widthVariables } from './Container'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  width: keyof typeof widthVariables
}

const Header = ({ children, width, className = '', ...props }: HeaderProps) => {
  return (
    <div
      className={`
        py-[20px]
        border-b
        border-black
        ${width === 'full' ? 'px-[40px]' : ''}
        ${className}
      `}
      {...props}>
      <Container width={width}>{children}</Container>
    </div>
  )
}

export default Header
