import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function Scene({ children, ...props }) {
  const targetObject = useRef()
  const directionalLight = useRef()

  useEffect(() => {})
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>

      {children}
      <Preload all />

      <object3D ref={targetObject} position={[-4, 0, 0]} />
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} />
    </Canvas>
  )
}
