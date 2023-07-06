import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import Checkbox from './Checkbox'
import ChevornRight from '@/assets/icons/chevron-right.svg'

const StyleListVariables = {
  default: `[&:not(:last-of-type)]:border-b box-border mx-[20px] py-[20px] font-semibold`,
  highlight: `p-[20px] border bg-gray-100 font-[700]`,
} as const

type CheckboxListDict = {
  title: string
  description?: string
  onSideButtonClick?: () => void
  sideButtonChildren?: JSX.Element
  highlight: boolean
  value?: string
  register?: any
  required?: boolean
}

interface CheckboxListProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  items: CheckboxListDict[]
  id: string
  name: string
  globalRegister: any
}

const CheckboxList = forwardRef<HTMLInputElement, CheckboxListProps>(
  ({ items, id, name, checked, globalRegister, ...props }: CheckboxListProps, ref) => {
    return (
      <div id={id} {...props} ref={ref}>
        {items.map((item, index) => {
          const { title, description, onSideButtonClick, sideButtonChildren, highlight, value, register, required } =
            item

          return (
            <div
              key={`${id}-${index}`}
              className={`
              flex
              ${StyleListVariables[highlight ? 'highlight' : 'default']}
            `}>
              <Checkbox
                className='bottom-0 shrink-0'
                id={title}
                name={name}
                value={value}
                checked={checked}
                ref={ref}
                {...globalRegister}
                {...register}
              />
              <label className='w-full mx-[10px]' htmlFor={title}>
                {title}
                {description ? (
                  <p className='text-[0.813rem] mt-[10px] text-typo-black-secondary'>{description}</p>
                ) : (
                  ''
                )}
              </label>
              {onSideButtonClick ? (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    onSideButtonClick()
                  }}>
                  {sideButtonChildren ? sideButtonChildren : <ChevornRight />}
                </button>
              ) : (
                ''
              )}
            </div>
          )
        })}
      </div>
    )
  },
)

CheckboxList.displayName = 'CheckboxList'

export default CheckboxList
