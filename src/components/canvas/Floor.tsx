import { landClickPosState } from '@/recoil/landClickPos/atom'
import { clone } from '@/utils/SkeletonUtils'
import { TransformControls, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Indicator from './Indicator'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useBox } from '@react-three/cannon'
import { BoxCollider } from './Colliders'
import { isEditModeState } from '@/recoil/isEditMode/atom'
import { Vector3 } from 'three'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { newWallState } from '@/recoil/newWallPosition/atom'
import { wallTextureState } from '@/recoil/wallTexture/atom'
import * as THREE from 'three'
import { landClickIndexForFloorState } from '@/recoil/landClickIndexForFloor/atom'
import FloorInstallBtns from './FloorInstallBtns'
import { newFloorState } from '@/recoil/newFloorPosition/atom'
import { selectedExteriorItemState } from '@/recoil/selectedExteriorItem/atom'

function Floor(props) {
  const group = useRef()
  const glb = useGLTF('/models/exterior_items/floor_1.glb')
  const targetObject = useRef()
  const directionalLight = useRef()

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)
  const [newFloor, setNewWall] = useRecoilState(newFloorState)

  const [landClickIndex, setLandClickIndex] = useRecoilState(landClickIndexForFloorState)

  const [selectedExteriorItem, setSelectedExteriorItem] = useRecoilState(selectedExteriorItemState)

  const [floorPositions, setFloorPositions] = useState([])

  const [removedArr, setRemovedArr] = useState([])

  const clonedArr = []

  function disposeMesh(mesh) {
    if (mesh) {
      console.log(mesh)
      mesh.geometry.dispose()
      mesh.material.dispose()
      scene.remove(mesh)
      mesh = undefined //clear any reference for it to be able to garbage collected
    }
  }

  for (let i = 0; i < 200; i++) {
    // console.log(glb.scene.children[0].children[0].children[0].children[0].children[0].material)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    // eslint-disable-next-line react-hooks/rules-of-hooks

    clonedArr.push(cloned)
  }

  useEffect(() => {
    if (newFloor && isEditMode && selectedExteriorItem === 'floor') {
      setFloorPositions([...floorPositions, newFloor.position])

      if (newFloor.rotation) {
        clonedArr[landClickIndex]?.rotation.set(newFloor.rotation.x, newFloor.rotation.y, newFloor.rotation.z)
      }

      if (landClickIndex > 200 && removedArr[0]) {
        // removedArr[0].collider.mesh.current.position.setX(newFloor.position.x)
        // removedArr[0].collider.mesh.current.position.setY(newFloor.position.y)
        // removedArr[0].collider.mesh.current.position.setZ(newFloor.position.z)
        // removedArr[0].collider.api.position.set(newFloor.position.x, newFloor.position.y, newFloor.position.z)
        // removedArr[0].collider.api.rotation.set(newFloor.rotation.x, newFloor.rotation.y, newFloor.rotation.z)
        removedArr[0].model.position.set(newFloor.position.x, newFloor.position.y, newFloor.position.z)

        setRemovedArr(removedArr.slice(1))
      }

      setSelectedItem(clonedArr[landClickIndex])
      setLandClickIndex(landClickIndex + 1)
    }
  }, [newFloor])

  useEffect(() => {
    const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point
    const floorModel = raycaster
      .intersectObjects(scene.children)
      .find((target) => target.object.parent.name === 'floor_1')

    if (isEditMode && selectedExteriorItem === 'floor') {
      setFloorPositions([...floorPositions, { x: landClickPos.x, y: landClickPos.y + 0.5, z: landClickPos.z }])

      setSelectedItem(clonedArr[landClickIndex])
      setLandClickIndex(landClickIndex + 1)

      if (landClickIndex > 200 && removedArr[0]) {
        removedArr[0].collider.mesh.current.position.setX(landClickPos.x)
        removedArr[0].collider.mesh.current.position.setY(landClickPos.y)
        removedArr[0].collider.mesh.current.position.setZ(landClickPos.z)
        removedArr[0].collider.api.position.set(landClickPos.x, landClickPos.y, landClickPos.z)

        removedArr[0].model.position.set(landClickPos.x, landClickPos.y, landClickPos.z)
        setSelectedItem(removedArr[0].model)
        setRemovedArr(removedArr.slice(1))
      }
    }
  }, [landClickPos])

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

        clonedArr.map((cloned, index) => {
          if (index <= landClickIndex) {
            return (
              <>
                <primitive
                  key={index}
                  name={'floor'}
                  // onClick={(e) => findPosition(e)}
                  onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                    // boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = 'default'
                  }}
                  // 마우스 오른쪽 클릭 시 바닥 제거
                  onContextMenu={(e) => {
                    e.stopPropagation()
                    // disposeMesh(clonedArr[index])
                    // clonedArr[index].clear()
                    if (isEditMode) {
                      cloned.position.set(1000, 1000, 1000)

                      setRemovedArr([...removedArr, { model: cloned }])
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()

                    if (isEditMode && selectedExteriorItem === 'floor') {
                      setSelectedItem(e.eventObject)
                    }
                  }}
                  // onMouseUp={boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)}

                  position={[floorPositions[index]?.x, floorPositions[index]?.y, floorPositions[index]?.z]}
                  scale={[0.222, 1, 0.222]}
                  rotation={[0, 0, 0]}
                  object={cloned}
                  modelInfo={{
                    name: 'floor',
                    index,
                  }}
                  // visible={false}
                />
              </>
            )
          }
        })
      }

      {/* <Indicator 
                position={ selectedItem ? [
                    parseFloat(selectedItem.position.x), parseFloat(selectedItem.position.y) +4, parseFloat(selectedItem.position.z)
                ] : null} 
                visible={true}
            /> */}
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
      <FloorInstallBtns />
    </>
  )
}

export default Floor
