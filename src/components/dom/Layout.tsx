import { useRef, forwardRef, useImperativeHandle, HTMLAttributes, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useRecoilState, useResetRecoilState } from 'recoil'
import authState, { keepSignInState } from '@/recoil/auth/atom'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const canvasFixedPaths = ['/3dWorld']
  const localRef = useRef()
  const [auth] = useRecoilState(authState)
  const resetAuthState = useResetRecoilState(authState)
  const [keepSignIn] = useRecoilState(keepSignInState)
  const router = useRouter()

  useEffect(() => {
    if (!keepSignIn) resetAuthState()
  }, [keepSignIn, resetAuthState])

  useEffect(() => {
    const { accessToken } = auth

    if (!accessToken) {
      Router.push('/signin')
    }
  }, [auth])

  useImperativeHandle(ref, () => localRef.current)

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
