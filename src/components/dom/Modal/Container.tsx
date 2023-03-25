import { HTMLAttributes } from 'react'

const Container = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`
        bg-white
        p-[10px]
        lg:p-[30px]
        rounded-[20px]
        flex
        flex-col
        h-[90%]
        w-[90%]
        lg:h-auto
        lg:w-auto
      `}>
      {children}
    </div>
  )
}

export default Container
