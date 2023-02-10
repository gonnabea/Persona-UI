import { HTMLAttributes } from 'react'

const Footer = ({ children, className = '', ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={`
        w-full
        border-t
        border-black
        border-opacity-10
        py-[30px]
        flex
        justify-center
        items-center
        font-semibold
        text-[11px]
        text-gray-900
        ${className}
      `}
      {...props}>
      {children}
    </footer>
  )
}

export default Footer
