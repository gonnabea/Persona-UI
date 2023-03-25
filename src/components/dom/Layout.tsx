import { useRef, forwardRef, useImperativeHandle, HTMLAttributes, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import auth from '@/recoil/auth/atom'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const localRef = useRef()
  const router = useRouter()
  const [authState] = useRecoilState(auth)
  const { accessToken } = authState

  useEffect(() => {
    if (accessToken) {
      router.push('/characters')
    } else {
      router.push('/signin')
    }
  }, [accessToken, router])

  useImperativeHandle(ref, () => localRef.current)

  return (
    <div {...props} ref={localRef} className='h-full text-[14px] lg:text-[16px]'>
      {children}
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
