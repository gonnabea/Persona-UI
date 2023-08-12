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
import WallInstallBtns from './WallInstallBtns'
import { selectedExteriorItemState } from '@/recoil/selectedExteriorItem/atom'

function Wall(props) {
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
  const [wallTexture, setWallTexture] = useRecoilState(wallTextureState)

  const [landClickIndex, setLandClickIndex] = useRecoilState(landClickIndexState)

  const [blockPositions, setBlockPositions] = useState([])

  const [removedArr, setRemovedArr] = useState([])

  const clonedArr = []

  const boxColliders = []

  const [selectedExteriorItem, setSelectedExteriorItem] = useRecoilState(selectedExteriorItemState)

  // console.log(wallTexture)

  // console.log('useBoxTest:   ', useBoxTest)

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
    const [mesh, api] = useBox(() => ({
      mass: 1,
      type: 'Static',
      rotation: [0, 0, 0],
      position: [0, 0, 0],
      args: [2.35, 4, 0.2],

      onCollide: (e) => {
        // console.log(e)
      },
    }))

    clonedArr.push(cloned)
    boxColliders.push({ mesh: mesh, api })
  }

  useEffect(() => {
    if (newWall && isEditMode && selectedExteriorItem === 'wall') {
      setBlockPositions([...blockPositions, newWall.position])

      if (newWall.rotation) {
        clonedArr[landClickIndex]?.rotation.set(newWall.rotation.x, newWall.rotation.y, newWall.rotation.z)
      }

      if (landClickIndex > 200 && removedArr[0]) {
        removedArr[0].collider.mesh.current.position.setX(newWall.position.x)
        removedArr[0].collider.mesh.current.position.setY(newWall.position.y)
        removedArr[0].collider.mesh.current.position.setZ(newWall.position.z)
        removedArr[0].collider.api.position.set(newWall.position.x, newWall.position.y, newWall.position.z)
        removedArr[0].collider.api.rotation.set(newWall.rotation.x, newWall.rotation.y, newWall.rotation.z)
        removedArr[0].model.position.set(newWall.position.x, newWall.position.y, newWall.position.z)

        setRemovedArr(removedArr.slice(1))
      }

      const texture = new THREE.TextureLoader().load(wallTexture)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(4, 4)
      texture.rotation = Math.PI / 2

      clonedArr[landClickIndex].children[0].children[0].children[0].children[0].children[0].material.map = texture
      setSelectedItem(clonedArr[landClickIndex])
      setLandClickIndex(landClickIndex + 1)

      setSelectedItem(clonedArr[landClickIndex])
      setLandClickIndex(landClickIndex + 1)
    }
  }, [newWall])

  useEffect(() => {
    clonedArr.forEach((cloned, index) => {
      boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
      boxColliders[index].api.rotation.set(cloned.rotation.x, cloned.rotation.y, cloned.rotation.z)
    })
  }, [isEditMode])

  useEffect(() => {
    if (isEditMode && selectedExteriorItem === 'wall') {
      Object.values(glb.materials).forEach((material) => {
        material.metalness = 0.5
        material.roughness = 0.2
      })

      setBlockPositions([...blockPositions, landClickPos])

      setSelectedItem(clonedArr[landClickIndex])
      setLandClickIndex(landClickIndex + 1)

      const texture = new THREE.TextureLoader().load(wallTexture)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(4, 4)
      texture.rotation = Math.PI / 2

      clonedArr[landClickIndex].children[0].children[0].children[0].children[0].children[0].material.map = texture

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

        clonedArr.map((cloned, index) => {
          if (index <= landClickIndex) {
            return (
              <>
                <primitive
                  key={index}
                  name={'wall'}
                  // onClick={(e) => findPosition(e)}
                  onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                    // boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = 'default'
                  }}
                  // 마우스 오른쪽 클릭 시 벽 제거
                  onContextMenu={(e) => {
                    console.log(e)
                    e.stopPropagation()
                    // disposeMesh(clonedArr[index])
                    // clonedArr[index].clear()
                    if (isEditMode) {
                      cloned.position.set(1000, 1000, 1000)
                      boxColliders[index].mesh.current.position.setX(1000)
                      boxColliders[index].mesh.current.position.setY(1000)
                      boxColliders[index].mesh.current.position.setZ(1000)

                      boxColliders[index].api.position.set(1000, 1000, 1000)

                      setRemovedArr([...removedArr, { collider: boxColliders[index], model: cloned }])
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()

                    if (isEditMode && selectedExteriorItem === 'wall') {
                      setSelectedItem(e.eventObject)
                    }
                  }}
                  // onMouseUp={boxColliders[index].api.position.set(cloned.position.x, cloned.position.y, cloned.position.z)}

                  position={[blockPositions[index]?.x, blockPositions[index]?.y, blockPositions[index]?.z]}
                  scale={[2.35, 4.3, 0.2]}
                  rotation={[0, 0, 0]}
                  object={cloned}
                  modelInfo={{
                    name: 'wall',
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
      <WallInstallBtns />
    </>
  )
}

export default Wall
