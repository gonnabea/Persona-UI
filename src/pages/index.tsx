import { useEffect } from 'react'
import Router from 'next/router'

export default function Page() {
  useEffect(() => {
    alert(process.env.NODE_ENV)
    // Recoil 적용하면 로그인 상태 확인 후 캐릭터 선택으로 이동하는 로직 구현 예정
    Router.push('/signin')
  }, [])

  return null
}
