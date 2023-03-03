// 현재 마우스 위치 표시용 컴포넌트

import { useGLTF } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { FBXLoader } from 'three-stdlib'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let mouseStatus: string
function PositionTracker(props) {
  const { viewport } = useThree()

  // const ref = useRef({
  //     position: {}
  // });

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    // const tracker = ref.current as any
    // tracker.position.set(x, y, 0)
    // tracker.rotation.set(-y, x, 0)

    mouseStatus = x + ', ' + y
  })

  useEffect(() => {
    const mouseClickEvent = () => {
      console.log(mouseStatus)
    }

    if (typeof window !== undefined) {
      window.addEventListener('click', mouseClickEvent)
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener('click', mouseClickEvent)
      }
    }
  }, [])

  return (
    // <Suspense fallback={null}>
    //     <primitive object={fbx} {...props} />
    // </Suspense>
    <>{/* {console.log(ref.current)} */}</>
  )
}

export default PositionTracker
