import { useEffect } from 'react'
import Router from 'next/router'
import { useRecoilState } from 'recoil'
import auth from '@/recoil/auth/atom'

export default function Page() {
  const [authState] = useRecoilState(auth)
  useEffect(() => {
    // Recoil 적용하면 로그인 상태 확인 후 캐릭터 선택으로 이동하는 로직 구현 예정
    const { accessToken } = authState
    if (accessToken) {
      Router.push('/characters')
    } else {
      Router.push('/signin')
    }
  }, [authState])

  return null
}
