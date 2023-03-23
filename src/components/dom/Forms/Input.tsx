import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

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

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', errorMessage, required, label, type, id, ...props }: InputProps, ref) => {
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
          ref={ref}
          id={id}
          type={type}
          required={required}
          className={twMerge(`
          pl-[12px]
          py-[12px]
          ${errorMessage ? '' : 'mb-[20px]'}
          font-semibold
          text-base
          rounded-lg
          text-gray-400
          appearance-none
          outline-none
          shadow-[0_0_0_1px_theme('colors.gray.500')]
          focus:shadow-[0_0_0_2px_theme('colors.primary.100')]
          disabled:shadow-[0_0_0_2px_theme('colors.gray.300')]
          disabled:bg-gray-200
          placeholder:focus:text-black
          ${className}
        `)}
          {...props}
        />
        {errorMessage ? <p className='w-full mt-[5px] mb-[20px] text-[#FF4218] text-[0.813rem]'>{errorMessage}</p> : ''}
      </>
    )
  },
)

Input.displayName = 'Input'

export default Input
