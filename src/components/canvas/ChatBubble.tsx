import { Html } from '@react-three/drei'
import { useEffect, useState } from 'react'

// 체력바 추가 시 타입추가
type ChatBubbleType = {
  positionX: number
  positionY: number
  positionZ: number
  username: string
  text: string
}

// 닉네임 컴포넌트
const ChatBubble = ({ positionX, positionY, positionZ, text, username }: ChatBubbleType) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setHidden(false)
    const timer = setTimeout(() => {
      setHidden(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [text])

  if (hidden) return ''

  return (
    <Html position={[positionX, positionY, positionZ]} as='div'>
      <div className='w-auto text-xs text-white border-white rounded-full bg-primary-100 bg-opacity-70 p-[10px] break-keep'>
        {username}:{text}
      </div>
    </Html>
  )
}

export default ChatBubble
