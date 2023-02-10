import { HTMLAttributes } from 'react'

const buttonColorVariables = {
  primary: `
    bg-primary-200
    hover:bg-primary-100
    active:bg-primary-300
    text-white
    font-semibold
    disabled:bg-gray-300
    disabled:text-gray-400
  `,
  secondary: `
    bg-gray-200
    font-normal
    hover:text-primary-200
    hover:bg-gray-200
    active:text-primary-200
    active:bg-gray-300
    disabled:text-gray-400
    disabled:bg-gray-200
  `,
} as const

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color: keyof typeof buttonColorVariables
  disabled?: boolean
}

const Button = ({ children, color, className = '', ...props }: ButtonProps) => {
  // Custom className for override styles or define className for tailwind

  return (
    <button
      className={`
        ${buttonColorVariables[color]}
        py-[13px]
        px-[46px]
        rounded-lg
        ${className}
      `}
      {...props}>
      {children}
    </button>
  )
}

export default Button
