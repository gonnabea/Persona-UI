import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={2} />
      <ambientLight intensity={0.6} />
      {children}
      <Preload all />
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
