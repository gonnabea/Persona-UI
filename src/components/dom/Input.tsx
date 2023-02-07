import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type:
    | 'button'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
}

const Input = ({ className, label, type, id, ...props }: InputProps) => {
  const overridedClassName = className || ''

  return (
    <>
      {label ? (
        <label className='inline-block text-sm mb-[5px]' htmlFor={id}>
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        id={id}
        type={type}
        className={`
          pl-[12px]
          py-[12px]
          mb-[20px]
          font-[600]
          text-base
          rounded-lg
          outline
          outline-offset-0
          outline-[1px]
          outline-gray-500
          text-gray-700
          focus:outline-primary-100
          focus:outline-[2px]
          disabled:outline-gray-200
          disabled:bg-gray-100
          placeholder:focus:text-black
          ${overridedClassName}
        `}
        {...props}
      />
    </>
  )
}

export default Input
