import { HTMLAttributes } from 'react'

const Body = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className='text-sm font-semibold py-[30px]'>{children}</div>
}

export default Body
