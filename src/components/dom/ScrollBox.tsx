interface ScrollBoxProps {
  children: JSX.Element
  className?: string
}

const ScrollBox = ({ children, className = '' }: ScrollBoxProps) => {
  return (
    <div
      className={`
        bg-gray-100
        overflow-y-scroll
        overflow-x-auto
        p-[20px]
        ${className}
      `}>
      {children}
    </div>
  )
}

export default ScrollBox
