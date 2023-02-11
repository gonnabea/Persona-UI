import { HTMLAttributes } from 'react'

const Container = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`
        bg-white
        p-[30px]
        rounded-[20px]
      `}>
      {children}
    </div>
  )
}

export default Container
