import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonColorVariables = {
  primary: `
    bg-primary-200
    hover:bg-primary-100
    active:bg-primary-400
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
  transparent: `
    font-semibold
  `,
} as const

const buttonIconVariables = {
  default: `
    py-[13px]
    px-[46px]
  `,
  icon: `
    p-[24px]
  `,
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color: keyof typeof buttonColorVariables
  useIcon?: boolean
  disabled?: boolean
}

const Button = ({ children, color, useIcon, className = '', ...props }: ButtonProps) => {
  // Custom className for override styles or define className for tailwind

  return (
    <button
      className={twMerge(`
        py-[13px]
        px-[46px]
        rounded-lg
        ${buttonColorVariables[color]}
        ${useIcon ? buttonIconVariables['icon'] : buttonIconVariables['default']}
        ${className}
      `)}
      {...props}>
      {children}
    </button>
  )
}

export default Button
