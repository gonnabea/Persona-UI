import { forwardRef, InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelPosition?: 'left' | 'right'
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, id, labelPosition = 'left', ...props }: CheckboxProps, ref) => {
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
          ref={ref}
          className={`
          align-middle
          bottom-[0.08em]
          relative
          appearance-none
          w-[22px]
          h-[22px]
          bg-white
          rounded
          border-gray-500
          border-[1px]
          hover:border-primary-100
          hover:border-[2px]
          checked:bg-primary-100
          disabled:bg-gray-200
          disabled:border-gray-300
          [&:not(:disabled)]:checked:border-none
          disabled:checked:hover:border-[1px]
          checked:before:bg-white
          disabled:checked:before:bg-gray-400
          checked:before:[mask-image:url('/icons/check-icon.svg')]
          checked:before:absolute
          checked:before:top-0
          checked:before:left-0
          checked:before:w-[22px]
          checked:before:h-[22px]
          disabled:checked:before:top-[-1px]
          disabled:checked:before:left-[-1px]
          disabled:checked:before:w-[22px]
          disabled:checked:before:h-[22px]
          ${className}
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
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
