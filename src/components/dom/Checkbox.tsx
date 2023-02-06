import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelPosition?: 'left' | 'right'
}

const Checkbox = ({ className, label, id, labelPosition = 'left', ...props }: CheckboxProps) => {
  const overridedClassName = className || ''
  return (
    <>
      {label && labelPosition === 'left' ? (
        <label className='inline-block text-xs mr-[8px]' htmlFor={id}>
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        type='checkbox'
        id={id}
        className={`
        align-middle
        bottom-[0.08em]
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
        checked:disabled:bg-gray-100
        checked:disabled:border-gray-200
        checked:border-none
        checked:before:bg-white
        disabled:checked:before:bg-gray-500
        checked:before:[mask-image:url('/icons/check-icon.svg')]
        checked:before:absolute
        checked:before:top-0
        checked:before:left-0
        checked:before:w-[22px]
        checked:before:h-[22px]
        ${overridedClassName}
        `}
        {...props}
      />
      {label && labelPosition === 'right' ? (
        <label className='inline-block text-xs ml-[8px]' htmlFor={id}>
          {label}
        </label>
      ) : (
        ''
      )}
    </>
  )
}

export default Checkbox
