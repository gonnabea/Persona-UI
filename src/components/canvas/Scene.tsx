import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

interface SceneProps {
  children: JSX.Element
  orbitControl?: boolean
}

export default function Scene({ children, orbitControl, ...props }: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={2} />
      <ambientLight intensity={0.6} />
      {children}
      <Preload all />
      {orbitControl ? <OrbitControls /> : ''}
    </Canvas>
  )
}
