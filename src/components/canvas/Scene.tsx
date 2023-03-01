import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import * as THREE from "three";
import { Vector3 } from 'three';
import { useRef } from 'react';

export default function Scene({ children, ...props }) {

  const targetObject = useRef();

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight position={[0, 0, 0]} intensity={4} target={targetObject.current} />
      <object3D ref={targetObject} position={[-4, 0, 0]} />
      <ambientLight intensity={0.5} />
      {children}
      <Preload all />
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
