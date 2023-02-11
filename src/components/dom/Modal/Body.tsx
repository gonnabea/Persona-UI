import { HTMLAttributes } from 'react'

const Body = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className='text-sm font-semibold'>{children}</div>
}

export default Body
