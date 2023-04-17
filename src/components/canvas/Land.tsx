import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef } from 'react'

function Land(props) {
  const group = useRef()
  const glb = useGLTF('/models/the_pure_land.glb')

  console.log(glb)

//   Object.keys(glb.materials).forEach(function(v){
//     glb.materials[v].metalness = 1;
//     glb.materials[v].roughness = 0.8;
    
// })

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const findPosition = (e) => {
    // 마우스 클릭한 지점 위치 얻기
    const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point

    console.log(clickedPosition)

    //   console.log(clickedPosition)
  }

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // console.log("Hey, I'm executing every frame!");
    // console.log(a)
  })

  return (
    <Suspense fallback={null}>
      <primitive
        onClick={(e) => findPosition(e)}
        position={props.position}
        scale={0.1}
        rotation={props.rotation}
        object={glb.scene}
      />
    </Suspense>
  )
}

export default Land
