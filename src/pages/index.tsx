import { useEffect } from 'react'
import Router from 'next/router'

export default function Page() {
  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem('me'))
    const isSignIn = authState?.data.token

    if (authState?.data?.isGuest) {
      localStorage.removeItem('me')
    }

    if (!isSignIn) {
      Router.push('/signin')
    } else {
      Router.push('/characters')
    }
  }, [])

  return null
}
