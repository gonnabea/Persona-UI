import { useRef, forwardRef, useImperativeHandle, HTMLAttributes, useEffect, useState } from 'react'
import Router from 'next/router'
import { useRecoilState, useResetRecoilState } from 'recoil'
import authState, { keepSignInState } from '@/recoil/auth/atom'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const localRef = useRef()
  const [auth] = useRecoilState(authState)
  const resetAuthState = useResetRecoilState(authState)
  const [keepSignIn] = useRecoilState(keepSignInState)

  useEffect(() => {
    if (!keepSignIn) resetAuthState()
  }, [keepSignIn, resetAuthState])

  useEffect(() => {
    const { accessToken } = auth

    if (accessToken) {
      Router.push('/characters')
    } else {
      Router.push('/signin')
    }
  }, [auth])

  useImperativeHandle(ref, () => localRef.current)

  return (
    <div {...props} ref={localRef} className='h-full text-[14px] lg:text-[16px]'>
      {children}
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
