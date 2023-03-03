import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { Vector3 } from 'three'
import { useEffect, useRef } from 'react'

interface SceneProps {
  children: JSX.Element
  orbitControl?: boolean
}

export default function Scene({ children, orbitControl = true, ...props }: SceneProps) {
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
      {orbitControl ? <OrbitControls /> : ''}
    </Canvas>
  )
}
