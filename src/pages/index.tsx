import { useEffect } from 'react'
import Router from 'next/router'

export default function Page() {
  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem('me'))
    const accessToken = authState.token

    if (!accessToken) {
      Router.push('/signin')
    } else {
      Router.push('/characters')
    }
  }, [])

  return null
}
