import { HTMLAttributes } from 'react'

import X from '@/assets/icons/x.svg'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  toggle: () => void
}

const Header = ({ children, className = '', toggle }: HeaderProps) => {
  return (
    <div className='mx-[-30px] mt-[-30px]'>
      <div className='text-right px-[10px] pt-[10px]'>
        <button onClick={toggle}>
          <X />
        </button>
      </div>
      <div
        className={`
            px-[30px]
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
