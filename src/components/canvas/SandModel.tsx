import { landClickPosState } from '@/recoil/landClickPos/atom'
import { clone } from '@/utils/SkeletonUtils'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Indicator from "./Indicator"


function SandModel(props) {
  const group = useRef()
  const glb = useGLTF('/models/sand_1.glb')
  const targetObject = useRef()
  const directionalLight = useRef()
 



  Object.values(glb.materials).forEach(material => {
    
    material.metalness = 0.5;
    material.roughness = 0.2;

  })

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)

  const [landClickIndex, setLandClickIndex] = useState(0);

  const [blockPositions, setBlockPositions] = useState([]);


  const clonedArr = [];

  for(let i=0; i<200; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    clonedArr.push(cloned)
 
  }



  


  console.log(clonedArr)



  useEffect(() => {
        const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point


        // setLandClickPos(clickedPosition);
    setLandClickIndex(landClickIndex + 1)


    setBlockPositions([...blockPositions, landClickPos])



  }, [landClickPos])

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // console.log("Hey, I'm executing every frame!");
    // console.log(a)
  })

  return (
    <>
      <primitive
  
        onPointerOver={() => {
            document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
            document.body.style.cursor = "default"
        }}
        position={[0,0,0]}
        scale={[3,3, 1]}
        rotation={[0,0,0]}
        object={glb.scene}
        // visible={false}
      />
      {
        
          //   <primitive
          //   onClick={(e) => findPosition(e)}
          //   onPointerOver={() => {
          //       document.body.style.cursor = "pointer"
          //   }}
          //   onPointerOut={() => {
          //       document.body.style.cursor = "default"
          //   }}
          //   position={[10 ,0, 0]}
          //   scale={[10,10, 1]}
          //   rotation={[0,0,0]}
          //   object={cloned}
          //   // visible={false}
          // />
          clonedArr.map((cloned, index) => 
          { 
            if(index <= landClickIndex) {

                return <primitive
                key={index}
                // onClick={(e) => findPosition(e)}
                onPointerOver={() => {
                    document.body.style.cursor = "pointer"
                }}
                onPointerOut={() => {
                    document.body.style.cursor = "default"
                }}
                position={[blockPositions[index]?.x.toFixed(0), blockPositions[index]?.y.toFixed(0), blockPositions[index]?.z.toFixed(0)]}
                scale={[3,3, 0.3]}
                rotation={[0,0,0]}
                object={cloned}
                // visible={false}
            />
            }
        }
          ) 
        
      }

        <Indicator 
                position={[
                    landClickPos?.x, landClickPos?.y +4, landClickPos?.z
                ]} 
                visible={true} 
            />
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
    </>
  )
}

export default SandModel
