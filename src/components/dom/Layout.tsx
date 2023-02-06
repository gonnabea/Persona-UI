import { useRef, forwardRef, useImperativeHandle, HTMLAttributes } from 'react'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  return (
    <div {...props} ref={localRef} className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'>
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
