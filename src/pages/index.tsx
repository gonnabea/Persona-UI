import { useEffect } from 'react'
import Router from 'next/router'

export default function Page() {
  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem('me'))
    const isSignIn = authState?.token || authState?.data.isGuest

    if (!isSignIn) {
      Router.push('/signin')
    } else {
      Router.push('/characters')
    }
  }, [])

  return null
}
