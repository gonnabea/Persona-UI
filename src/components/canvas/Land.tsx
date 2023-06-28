import { landClickPosState } from '@/recoil/landClickPos/atom'
import { OrbitControls, Sky, useGLTF } from '@react-three/drei'
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
    // 마우스 클릭한 지점 위치 얻기
    console.log(e)

    e.stopPropagation()

    if(raycaster.intersectObjects(scene.children)[0]) {
      // alert(raycaster.intersectObjects(scene.children)[0].object.name)

      const groundTarget = raycaster.intersectObjects(scene.children).find(target => target.object.name === 'ground1')
      console.log(groundTarget)
      const clickedPosition = groundTarget.point
  
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
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} {...props} />
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
      {/* <OrbitControls /> */}
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
    </Suspense>
  )
}

export default Land
