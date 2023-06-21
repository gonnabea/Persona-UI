import { landClickPosState } from '@/recoil/landClickPos/atom'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useRecoilState } from 'recoil'


function Land(props) {
  const group = useRef()
  const glb = useGLTF('/models/beach_island.glb')
  const targetObject = useRef()
  const directionalLight = useRef()

  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)

 



  Object.values(glb.materials).forEach(material => {
    
    material.metalness = 0.5;
    material.roughness = 0.2;



  })
  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const findPosition = (e) => {
    // 마우스 클릭한 지점 위치 얻기 (랜드 모델 한정)
    console.log(e)

    if(raycaster.intersectObjects(scene.children)[0].object.name === 'ground1') {
      console.log(raycaster.intersectObjects(scene.children)[0])
      const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point
  
      console.log(clickedPosition)
  
      setLandClickPos(clickedPosition)
    }

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
        onContextMenu={(e) => findPosition(e)}
        position={[0,48,0]}
        scale={0.1}
        rotation={[0,0,0]}
        object={glb.scene}
        modelInfo={{
          name: 'land'
        }}
        // visible={false}
      />
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
    </Suspense>
  )
}

export default Land
