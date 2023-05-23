import { Canvas, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene({ children, ...props }) {
  const targetObject = useRef()
  const directionalLight = useRef()
  const sceneRef = useRef();

  // const { scene } = useThree();

  useEffect(() => {
    // console.log(directionalLight)
    // const scene = sceneRef.current
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // sceneRef.current.add( directionalLight );
  }, [])
 
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props} ref={sceneRef}>
      {children}
      <Preload all />

      <object3D ref={targetObject} position={[-4, 0, 0]} />
      <ambientLight intensity={1} />

      <Suspense>
      <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} />
      </Suspense>
     
    </Canvas>
  )
}
