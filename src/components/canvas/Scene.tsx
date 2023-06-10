import { Canvas, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Scene({ children, ...props }) {
  const targetObject = useRef()
  const directionalLight = useRef()
  const sceneRef = useRef();
  const [dirLightIntensity, setDirLightIntensity] = useState(10)

  // const { scene } = useThree();

  useEffect(() => {
    setTimeout(() => {
      setDirLightIntensity(dirLightIntensity + 1)
    }, 20000)
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
    <Canvas {...props} ref={sceneRef}>
      <Suspense>
      {children}
    

      <ambientLight intensity={1} />

          <object3D ref={targetObject} position={[-4, 0, 0]} />
            <directionalLight ref={directionalLight} position={[0, 0, 0]} intensity={dirLightIntensity} target={targetObject.current} />

      </Suspense>
     
    </Canvas>
  )
}
