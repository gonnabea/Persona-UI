import { KeyboardControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { WebGPU } from './WebGPU'

export default function Scene({ children, ...props }) {
  const targetObject = useRef()
  const directionalLight = useRef()
  const sceneRef = useRef()
  const [dirLightIntensity, setDirLightIntensity] = useState(0)

  // const { scene } = useThree();

  useEffect(() => {
    setTimeout(() => {
      setDirLightIntensity(1)
      
    }, 0)
    // setTimeout(() => {
    //   directionalLight.current['intensity'] = 11;
    // }, 5000)
    // console.log(directionalLight)
    // const scene = sceneRef.current
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // sceneRef.current.add( directionalLight );
  }, [])

  // Everything defined in here will persist between route changes, only children are swapped
  return (
        <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}>
    <Canvas  {...props} ref={sceneRef} style={{ zIndex: 1 }}>
      <Suspense>
        {children}
        <ambientLight intensity={0.6} />
        <object3D ref={targetObject} position={[-4, 0, 0]} />
        <directionalLight
          ref={directionalLight}
          position={[0, 20, 0]}
          intensity={dirLightIntensity}
          target={targetObject.current}
        />
        
      </Suspense>
    </Canvas>
    </KeyboardControls>
  )
}
