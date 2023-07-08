import { landClickPosState } from '@/recoil/landClickPos/atom'
import { clone } from '@/utils/SkeletonUtils'
import { TransformControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Indicator from "./Indicator"
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useBox } from '@react-three/cannon'
import { BoxCollider } from './Colliders'
import { isEditModeState } from '@/recoil/isEdisMode/atom'
import { Vector3 } from 'three'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { newWallState } from '@/recoil/newWallPosition/atom'


function SandModel(props) {
  const group = useRef()
  const glb = useGLTF('/models/sand_1.glb')
  const targetObject = useRef()
  const directionalLight = useRef()
  
  

  
  
  
  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)
  
  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)
  const [newWall, setNewWall] = useRecoilState(newWallState)

  const [landClickIndex, setLandClickIndex] = useRecoilState(landClickIndexState);

  const [blockPositions, setBlockPositions] = useState([]);

  const [removedArr, setRemovedArr] = useState([]);


  const clonedArr = [];
  
  const boxColliders = [];
  

  const useBoxTest = useBox(() => ({
    mass: 1
  }))

  console.log('useBoxTest:   ',useBoxTest)

  function disposeMesh(mesh) {
    if(mesh) {
      console.log(mesh)
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
      mesh = undefined; //clear any reference for it to be able to garbage collected

    }
}

  for(let i=0; i<200; i++) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mesh, api] = useBox(() => ({
      mass: 1,
          type: 'Static',
      rotation: [0, 0, 0], 
      position: [0,0,0] , args: [2.35,4,0.2],
      
      onCollide: (e) => {
        console.log(e)

       

      },
      
    }))

    clonedArr.push(cloned)
    boxColliders.push({mesh: mesh, api})

 

 
  }

    useEffect(() => {
        
        
        console.log(newWall)
        if (newWall) {
          setBlockPositions([...blockPositions, newWall.position])
          
          
          setSelectedItem(clonedArr[landClickIndex])
          setLandClickIndex(landClickIndex + 1)

          if(newWall.rotation) {
            clonedArr[landClickIndex]?.rotation.set(
              
              newWall.rotation.x,
              newWall.rotation.y,
              newWall.rotation.z
            
              )

          }
         
          
            console.log(landClickIndex)
              if(landClickIndex > 200 && removedArr[0]) {
      
                removedArr[0].collider.mesh.current.position.setX(newWall.position.x)
                removedArr[0].collider.mesh.current.position.setY(newWall.position.y)
                removedArr[0].collider.mesh.current.position.setZ(newWall.position.z)
                removedArr[0].collider.api.position.set(newWall.position.x,newWall.position.y,newWall.position.z)
                removedArr[0].collider.api.rotation.set(newWall.rotation.x,newWall.rotation.y,newWall.rotation.z)
                removedArr[0].model.position.set(newWall.position.x,newWall.position.y,newWall.position.z)
                
                console.log(newWall)
                console.log(clonedArr[landClickIndex])

  
                setRemovedArr(removedArr.slice(1))
  
              }

        }


  
  }, [newWall])

  


  useEffect(() => {
        const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point

          Object.values(glb.materials).forEach(material => {
    
    material.metalness = 0.5;
    material.roughness = 0.2;

  })


        // setLandClickPos(clickedPosition);
        
        console.log(landClickPos)
        setBlockPositions([...blockPositions, landClickPos])
        
        
        setSelectedItem(clonedArr[landClickIndex])
        setLandClickIndex(landClickIndex + 1)
       
      

            if(landClickIndex > 200 && removedArr[0]) {
    
              removedArr[0].collider.mesh.current.position.setX(landClickPos.x)
              removedArr[0].collider.mesh.current.position.setY(landClickPos.y)
              removedArr[0].collider.mesh.current.position.setZ(landClickPos.z)
              removedArr[0].collider.api.position.set(landClickPos.x,landClickPos.y,landClickPos.z)
              

              removedArr[0].model.position.set(landClickPos.x,landClickPos.y,landClickPos.z)
              setSelectedItem(removedArr[0].model)
              setRemovedArr(removedArr.slice(1))

            }


  
  }, [landClickPos])

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // console.log("Hey, I'm executing every frame!");
    // console.log(a)
  })

  return (
    <>
    
      {/* <primitive
  
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
      /> */}
      
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

                return <>
                <TransformControls 
                
                onPointerOver={(e) => {
                  boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)

                }}
                onObjectChange={(e) => {

                  
              
                  boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
              

                  console.log(boxColliders[index].mesh)

                  console.log(boxColliders[index].api)

                  // console.log(selectedItem.scale)
                  // boxColliders[index].mesh.scale.set(Number(selectedItem.scale.x) ,selectedItem.scale.y, selectedItem.scale.z)
                  // boxColliders[index].api.scaleOverride([Number(selectedItem.scale.x), Number(selectedItem.scale.y), Number(selectedItem.scale.z)])
                  // console.log(boxColliders[index].api)
                  // boxColliders[index].api.wakeUp()
           
                  }} key={index} object={selectedItem} mode="translate">
                <primitive
                
                // onClick={(e) => findPosition(e)}
                onPointerOver={() => {
                    document.body.style.cursor = "pointer"
                  boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
             
                  boxColliders[index].mesh.current.position.setX(cloned.position.x)
                  boxColliders[index].mesh.current.position.setY(cloned.position.y)
                  boxColliders[index].mesh.current.position.setZ(cloned.position.z)


                    
                }}
                
                onPointerOut={() => {
                    document.body.style.cursor = "default"
                }}

                onContextMenu={(e) => {
                  console.log(e)
                  e.stopPropagation()
                  // disposeMesh(clonedArr[index])
                  // clonedArr[index].clear()

                  cloned.position.set(1000,1000,1000)
                  boxColliders[index].mesh.current.position.setX(1000)
                  boxColliders[index].mesh.current.position.setY(1000)
                  boxColliders[index].mesh.current.position.setZ(1000)
                  console.log(clonedArr[index])
                  boxColliders[index].api.position.set(1000,1000,1000)
                 
                  setRemovedArr([...removedArr, {collider: boxColliders[index], model: cloned}])
                  console.log(removedArr)
                 

                  
                }}

                onClick={(e) => {
                  e.stopPropagation()
                  console.log(e.eventObject)
                  setSelectedItem((e.eventObject))
                  boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
                  boxColliders[index].api.rotation.set(cloned.rotation.x, cloned.rotation.y, cloned.rotation.z)

                  console.log(boxColliders[index].api)
                
                  boxColliders[index].mesh.current.position.setX(cloned.position.x)
                  boxColliders[index].mesh.current.position.setY(cloned.position.y)
                  boxColliders[index].mesh.current.position.setZ(cloned.position.z)
                  
                }}

                

              
                // onMouseUp={boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)} 
                
                position={[parseFloat(blockPositions[index]?.x.toFixed(0)), parseFloat(blockPositions[index]?.y.toFixed(0)), parseFloat(blockPositions[index]?.z.toFixed(0))]}
                scale={[2.35,4.3,0.2]}
                rotation={[0,0,0]}
                object={cloned}
                modelInfo={{
                  name: 'sand_box',
                  index
                }}
                // visible={false}
            />
            
            </TransformControls>
            </>
            }
              <mesh ref={boxColliders[index].mesh} visible={true} >
                <boxGeometry 
                // args={clonedArr[index]} 
                  
                  args={[1,1,0.5]}
                />
                <meshStandardMaterial color="orange" visible={true} />
            </mesh>
        
        }
      
          ) 

          
        
      }


      

        {/* <Indicator 
                position={ selectedItem ? [
                    parseFloat(selectedItem.position.x), parseFloat(selectedItem.position.y) +4, parseFloat(selectedItem.position.z)
                ] : null} 
                visible={true}
            /> */}
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}

      
    </>
  )
}

export default SandModel
