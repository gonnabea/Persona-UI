import { landClickPosState } from '@/recoil/landClickPos/atom'
import { clone } from '@/utils/SkeletonUtils'
import { TransformControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Indicator from './Indicator'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useBox } from '@react-three/cannon'
import { BoxCollider } from './Colliders'
import { isEditModeState } from '@/recoil/isEditMode/atom'
import { Vector3 } from 'three'

function Block({ blockState, setBlockStates }) {
  const glb = useGLTF('/models/sand.glb')

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const cloned = useMemo(() => clone(glb.scene), [scene])

  const [mesh, api] = useBox(() => ({
    mass: 1,
    type: 'Static',
    rotation: [0, 0, 0],
    position: blockState.position,
    args: [2, 4, 0.2],

    onCollide: (e) => {
      console.log(e)
    },
  }))

  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  function disposeMesh(mesh) {
    if (mesh) {
      scene.remove(mesh)
      mesh.geometry.dispose()
      mesh.material.dispose()
      mesh = undefined //clear any reference for it to be able to garbage collected
    }
  }

  useEffect(() => {
    const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point

    Object.values(glb.materials).forEach((material) => {
      material.metalness = 0.5
      material.roughness = 0.2
    })

    // setLandClickPos(clickedPosition);

    // setBlockStates([...blockState, landClickPos])

    //   console.log(selectedItem)
  }, [landClickPos])

  return (
    <>
      <>
        {/* <TransformControls 
                
                onPointerOver={(e) => {
                  api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)

                }}
                onObjectChange={(e) => {

                  
              
                  api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
              

                  console.log(mesh)

        
           
                  }}  object={selectedItem} mode="translate">
               
               
            
            </TransformControls> */}
        <primitive
          name={'wall'}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
            api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)

            mesh.current.position.setX(cloned.position.x)
            mesh.current.position.setY(cloned.position.y)
            mesh.current.position.setZ(cloned.position.z)
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
          }}
          onClick={(e) => {
            e.stopPropagation()
            console.log(e.eventObject)
            setSelectedItem(e.eventObject)
            api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
            api.rotation.set(cloned.rotation.x, cloned.rotation.y, cloned.rotation.z)

            console.log(api)

            mesh.current.position.setX(cloned.position.x)
            mesh.current.position.setY(cloned.position.y)
            mesh.current.position.setZ(cloned.position.z)
          }}
          // onMouseUp={boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)}
          position={blockState.position}
          scale={[2, 4, 0.2]}
          rotation={[0, 0, 0]}
          object={cloned}

          // visible={false}
        />
      </>

      <mesh ref={mesh} visible={true}>
        <boxGeometry
          // args={clonedArr[index]}

          args={[1, 1, 0.5]}
        />
        <meshStandardMaterial color='orange' visible={true} />
      </mesh>

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

export default Block
