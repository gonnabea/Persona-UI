import { HTMLAttributes } from 'react'

import X from '@/assets/icons/x.svg'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  toggle: () => void
}

const Header = ({ children, className = '', toggle }: HeaderProps) => {
  return (
    <div className='mx-[-10px] mt-[-10px] lg:mx-[-30px] lg:mt-[-30px]'>
      <div className='text-right px-[10px] pt-[10px]'>
        <button onClick={toggle}>
          <X className='stroke-[#243747]' />
        </button>
      </div>
      <div
        className={`
            px-[10px]
            lg:px-[30px]
            font-bold
            text-xs
            text-gray-500
            ${className}
        `}>
        {children}
      </div>
    </div>
  )
}

export default Header
