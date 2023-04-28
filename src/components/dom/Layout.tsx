import { useRef, forwardRef, useImperativeHandle, HTMLAttributes, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useRecoilState, useResetRecoilState } from 'recoil'

const Layout = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
  const canvasFixedPaths = ['/3dWorld']
  const localRef = useRef()
  const router = useRouter()

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
