import { useRef, forwardRef, useImperativeHandle, HTMLAttributes, useEffect } from 'react'
import { useRouter } from 'next/router'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const canvasFixedPaths = ['/3dWorld']
  const localRef = useRef()
  const router = useRouter()

  useImperativeHandle(ref, () => localRef.current)

  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem('me'))
    const accessToken = authState?.token
    const ignoreRedirectList = [
      '/signup',
      '/signup/create',
      '/verify/email',
      '/404',
      '/resetPassword',
      '/resetPassword/set',
    ]

    console.log(ignoreRedirectList.includes(router.pathname), router)

    if (!ignoreRedirectList.includes(router.pathname)) {
      if (!accessToken) {
        router.push('/signin')
      }

      if (router.pathname === '/signin' && accessToken) {
        router.push('/characters')
      }
    }
  }, [])

  return (
    <div
      {...props}
      ref={localRef}
      className={`h-full text-[14px] lg:text-[16px] ${
        canvasFixedPaths.includes(router.pathname) ? 'fixed top-0 left-0 right-0 bottom-0' : ''
      }`}>
      {children}
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
