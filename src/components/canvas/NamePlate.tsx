import { Html } from '@react-three/drei'
import { useState } from 'react'

// 체력바 추가 시 타입추가
type NamePlateType = {
  positionX: number
  positionY: number
  positionZ: number
  username: string
}

// 닉네임 컴포넌트
const NamePlate = ({ positionX, positionY, positionZ, username }: NamePlateType) => {
  return (
    <group>
      <Html position={[positionX, positionY, positionZ]} as='div' width='50px' height='50px'>
        <div>{username}</div>
      </Html>
    </group>
  )
}

export default NamePlate
