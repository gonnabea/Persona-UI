import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
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

const Input = ({ className = '', errorMessage, required, label, type, id, ...props }: InputProps) => {
  return (
    <>
      {label ? (
        <label className='inline-block w-full text-sm mb-[5px]' htmlFor={id}>
          {label} <span className='font-semibold'>{required ? '(필수)' : ''}</span>
        </label>
      ) : (
        ''
      )}
      <input
        id={id}
        type={type}
        required={required}
        className={`
          pl-[12px]
          py-[12px]
          ${errorMessage ? '' : 'mb-[20px]'}
          font-[600]
          text-base
          rounded-lg
          outline
          outline-offset-0
          outline-[1px]
          outline-gray-500
          text-gray-400
          focus:outline-primary-100
          focus:outline-[2px]
          disabled:outline-gray-300
          disabled:bg-gray-200
          placeholder:focus:text-black
          ${className}
        `}
        {...props}
      />
      {errorMessage ? <p className='w-full mt-[5px] mb-[20px] text-[#FF4218] text-[0.813rem]'>{errorMessage}</p> : ''}
    </>
  )
}

export default Input
