import { Html } from '@react-three/drei'

// 체력바 추가 시 타입추가
type NamePlateType = {
  positionX: number
  positionY: number
  positionZ: number
  username: string
  text: string
}

// 닉네임 컴포넌트
const ChatBubble = ({ positionX, positionY, positionZ, text, username }: NamePlateType) => {
  return (
    <Html position={[positionX, positionY, positionZ]} as='div'>
      <div className='w-auto text-xs text-white border-white rounded-full bg-primary-100 bg-opacity-70 p-[10px] break-keep'>
        {username}:{text}
      </div>
    </Html>
  )
}

export default ChatBubble
