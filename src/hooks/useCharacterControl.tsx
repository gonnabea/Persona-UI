import { chatEnabledState } from '@/recoil/chat/atom'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const usePersonControls = () => {
  const chatEnabled = useRecoilValue(chatEnabledState)
  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
  }

  const moveFieldByKey = (key) => keys[key]

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })

  useEffect(() => {
    // 채팅이 활성화 됐을 때 이동 비활성화 처리
    if (chatEnabled)
      setMovement({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
      })

    // 채팅 활성화 상태가 아닐때만 이동 적용
    const handleKeyDown = (e) => {
      if (!chatEnabled) setMovement((movement) => ({ ...movement, [moveFieldByKey(e.code)]: true }))
    }
    const handleKeyUp = (e) => {
      if (!chatEnabled) setMovement((movement) => ({ ...movement, [moveFieldByKey(e.code)]: false }))
    }

    if (document) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      if (document) {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
      }
    }
  }, [chatEnabled])
  return movement
}

export default usePersonControls
