import { useEffect } from 'react'
import Router from 'next/router'
import { useRecoilState } from 'recoil'
import authState from '@/recoil/auth/atom'

export default function Page() {
  const [auth] = useRecoilState(authState)

  useEffect(() => {
    const { accessToken } = auth

    if (!accessToken) {
      Router.push('/signin')
    } else {
      Router.push('/characters')
    }
  }, [auth])

  return null
}
