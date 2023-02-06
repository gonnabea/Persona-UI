import { HTMLAttributes } from 'react'

const widthVariables = {
  sm: 'w-[320px]',
  md: 'w-[1200px]',
} as const

type WidthVariablesKey = keyof typeof widthVariables

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width: WidthVariablesKey // px
}

const Container = ({ children, width, className, ...props }: ContainerProps) => {
  const overridedClassName = className || ''

  return (
    <div
      className={`
        w-full
        h-full
        d-flex
        ${overridedClassName}
      `}
      {...props}>
      <div className={`${widthVariables[width]} h-full mx-auto`}>{children}</div>
    </div>
  )
}

export default Container
