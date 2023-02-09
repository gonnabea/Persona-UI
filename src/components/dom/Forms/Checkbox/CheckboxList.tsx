import { InputHTMLAttributes } from 'react'
import Checkbox from './Checkbox'
import ChevornRight from '@/assets/icons/chevron-right.svg'

const StyleListVariables = {
  default: `[&:not(:last-of-type)]:border-b box-border mx-[20px] py-[20px] font-[600]`,
  highlight: `p-[20px] border bg-[#D9D9D9] bg-opacity-10 font-[700]`,
} as const

type CheckboxListDict = {
  title: string
  description?: string
  onSideButtonClick?: () => void
  sideButtonChildren?: JSX.Element
  highlight: boolean
}

interface CheckboxListProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  items: CheckboxListDict[]
  id: string
}

const CheckboxList = ({ items, id, ...props }: CheckboxListProps) => {
  return (
    <div id={id} {...props}>
      {items.map((item, index) => {
        const { title, description, onSideButtonClick, sideButtonChildren, highlight } = item

        return (
          <div
            key={`${id}-${index}`}
            className={`
              flex
              ${StyleListVariables[highlight ? 'highlight' : 'default']}
            `}>
            <Checkbox className='bottom-0 shrink-0' id={title} />
            <label className='w-full mx-[10px]' htmlFor={title}>
              {title}
              {description ? <p className='text-[0.813rem] mt-[10px] text-typo-black-secondary'>{description}</p> : ''}
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
}

export default CheckboxList
