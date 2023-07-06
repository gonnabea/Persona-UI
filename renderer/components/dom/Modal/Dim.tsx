import { HTMLAttributes } from 'react'

const Dim = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`
        fixed
        top-0
        left-0
        w-full
        h-full
        flex
        flex-col
        justify-center
        items-center
        bg-black/[.6]
        z-10
      `}
      {...props}>
      {children}
    </div>
  )
}

export default Dim
