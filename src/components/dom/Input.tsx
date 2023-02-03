import { InputHTMLAttributes } from 'react'

const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  const overridedClassName = className || ''

  return (
    <input
      type='text'
      className={`
      pl-[12px]
      py-[12px]
      font-[600]
      text-base
      rounded-lg
      box-content
      outline
      outline-offset-0
      outline-[1px]
      outline-gray-400
      text-gray-500
      focus:outline-primary-100
      focus:outline-[2px]
      disabled:outline-gray-200
      disabled:bg-gray-100
      placeholder:focus:text-black
      ${overridedClassName}
      `}
      {...props}
    />
  )
}

export default Input
