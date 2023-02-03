import { HTMLAttributes } from 'react'

const Button = ({ children, className, ...props }: HTMLAttributes<HTMLButtonElement>) => {
  // Custom className for override styles or define className for tailwind
  const overridedClassName = className || ''

  return (
    <button
      className={`
        py-[13px]
        px-[46px]
        rounded-lg
        font-[600]
        bg-primary-200
        hover:bg-primary-100
        active:bg-primary-300
        disabled:bg-gray-300
        disabled:text-gray-600
        text-white
        ${overridedClassName}
      `}
      {...props}>
      {children}
    </button>
  )
}

export default Button
