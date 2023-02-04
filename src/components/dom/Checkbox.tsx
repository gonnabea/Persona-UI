import { InputHTMLAttributes } from 'react'

const Checkbox = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  const overridedClassName = className || ''
  return (
    <input
      type='checkbox'
      className={`
        relative
        appearance-none
        w-[22px]
        h-[22px]
        bg-white
        rounded
        border-gray-600
        border-[1px]
        hover:border-primary-100
        hover:border-[2px]
        checked:bg-primary-100
        checked:border-none
        checked:before:bg-check
        checked:before:absolute
        checked:before:top-0
        checked:before:left-0
        checked:before:w-[22px]
        checked:before:h-[22px]
        ${overridedClassName}
        `}
      {...props}
    />
  )
}

export default Checkbox
