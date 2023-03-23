import { useRef, forwardRef, useImperativeHandle, HTMLAttributes } from 'react'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  return (
    <div {...props} ref={localRef} className='h-full text-[14px] lg:text-[16px]'>
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
