import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function Scene({ children, ...props }) {
  const targetObject = useRef()

  useEffect(() => {})
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight position={[0, 0, 0]} intensity={15} target={targetObject.current} />
      <object3D ref={targetObject} position={[-4, 0, 0]} />
      <ambientLight intensity={0.6} />
      {children}
      <Preload all />
    </Canvas>
  )
}
