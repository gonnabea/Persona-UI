import { HTMLAttributes } from 'react'

export const widthVariables = {
  sm: 'w-[320px]',
  md: 'w-[900px]',
  full: 'w-full',
} as const

type WidthVariablesKey = keyof typeof widthVariables

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width: WidthVariablesKey // px
}

const Container = ({ children, width, className = '', ...props }: ContainerProps) => {
  return (
    <div
      className={`
        w-full
        h-full
        ${className}
      `}
      {...props}>
      <div className={`${widthVariables[width]} h-full mx-auto`}>{children}</div>
    </div>
  )
}

export default Container
