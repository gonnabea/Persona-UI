import { isEditModeState } from '@/recoil/isEditMode/atom'
import { itemsState } from '@/recoil/items/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { clone } from '@/utils/SkeletonUtils'
import { Html, useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { installingModelNameState } from '@/recoil/intallingModelName/atom'

let isEditModeVar = false
let installingModelNameVar = ''

function Lamp2() {
  const group = useRef()
  const glb = useGLTF('/models/interior_items/lamp_02.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [installingModelName, setInstallingModelName] = useRecoilState(installingModelNameState)

  const [updateIndex, forceUpdate] = useState(0)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const clonedArr = []

  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    clonedArr.push(cloned)
  }

  useEffect(() => {
    isEditModeVar = isEditMode
  }, [isEditMode])

  useEffect(() => {
    installingModelNameVar = installingModelName
  }, [installingModelName])

  // 마우스 무브 위치 얻기
  // 가구 설치 위치 미리보기
  const findMousePosition = (e) => {
    // console.log(e)

    e.stopPropagation()
    if (isEditModeVar && installingModelNameVar === 'lamp_2') {
      const installingModel = items.lamp_2.find((lamp_2) => lamp_2.installing === true)

      if (raycaster.intersectObjects(scene.children)[0] && installingModel && installingModel.installed === false) {
        // const wall = raycaster.intersectObjects(scene.children).find(target => target.object.modelInfo?.name === "wall");
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')
        // console.log(wall)

        if (groundTarget) {
          const mousePosition = groundTarget.point

          // if(items.lamp_2.installing === true)

          setInstallingPos([mousePosition.x + 1, mousePosition.y, mousePosition.z + 1])

          // setLandClickPos(clickedPosition)
        }
      }
    }

    //   console.log(clickedPosition)
  }

  // 마우스 클릭한 위치 얻기 - 모델 설치할 곳 선택
  const findClickedPosition = (e) => {
    // console.log(e)

    e.stopPropagation()

    if (isEditModeVar === true && installingModelNameVar === 'lamp_2') {
      if (raycaster.intersectObjects(scene.children)[0]) {
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')

        if (groundTarget) {
          const mousePosition = groundTarget.point

          const installingModelState = items.lamp_2.find((lamp_2) => lamp_2.installing === true)
          const installingModelStateIndex = items.lamp_2.findIndex((lamp_2) => lamp_2.installing === true)
          const installingModel = clonedArr[installingModelStateIndex]

          if (installingModelState && installingModelState.installed === false) {
            installingModelState.position = [mousePosition.x + 1, mousePosition.y, mousePosition.z + 1]

            installingModelState.installed = true
            installingModelState.installing = false

            setSelectedItem(installingModel)
            forceUpdate(updateIndex + 1)

            //   installingModel.scene.children[0].children[0].children[0].children[0].children.forEach((mesh) => {
            //     mesh.material.opacity = 1
            //   })

            removeEventListeners()
          }

          //    setSelectedItem(null)
        }
      }
    }
  }

  const removeEventListeners = () => {
    window.removeEventListener('click', findClickedPosition)
    window.removeEventListener('mousemove', findMousePosition)
  }

  useEffect(() => {
    window.addEventListener('mousemove', (e) => findMousePosition(e))

    window.addEventListener('click', (e) => findClickedPosition(e))

    return () => {
      removeEventListeners()
    }
  }, [])

  //   useEffect(() => {
  //     console.log(items.lamp_2)
  //     console.log(glb.scene)
  //     if (items.lamp_2.installing === true) {
  //       setSelectedItem(glb.scene)
  //     }
  //   }, [items.lamp_2])

  // 가구 설치중일 시 투명하게 보이게 하는 로직.
  //   useEffect(() => {
  //     const installingModel = items.lamp_2.find((lamp_2) => lamp_2.installing === true)
  //     const installingModelIndex = items.lamp_2.findIndex((lamp_2) => lamp_2.installing === true)
  //     if (installingModel) {
  //       clonedArr[installingModelIndex].children[0].children[0].children[0].children[0].children.forEach((mesh) => {
  //         // console.log(material)
  //         mesh.material.opacity = 0.5
  //         mesh.material.transparent = true
  //       })
  //     }
  //   }, [items.lamp_2])

  return (
    <>
      {clonedArr.map((lamp_2_scene, index) => {
        if (items.lamp_2[index].installing === true || items.lamp_2[index].installed === true) {
          return (
            <>
              <Suspense key={index} fallback={null}>
                <primitive
                  onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = 'default'
                  }}
                  // 수정 모드에서 가구 마우스 오른쪽 클릭 시 가구 제거
                  onContextMenu={(e) => {
                    e.stopPropagation()
                    if (isEditMode) {
                      // e.stopPropagation()
                      items.lamp_2[index].installed = false
                      items.lamp_2[index].installing = false
                      forceUpdate(updateIndex + 1)
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  // 수정 모드에서 마우스 왼쪽 더블 클릭 시 배치했던 가구 재배치
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    if (isEditMode) {
                      // console.log(e)
                      items.lamp_2[index].installed = false
                      items.lamp_2[index].installing = true
                      // window.addEventListener('mousemove', (e) => findMousePosition(e))
                      setSelectedItem(e.eventObject)

                      setInstallingModelName('lamp_2')

                      // setItems({ ...items, lamp_2: items.lamp_2 })
                      // console.log(items.lamp_2[index])
                    }
                  }}
                  scale={[1.5, 1.5, 1.5]}
                  position={items.lamp_2[index].installing == true ? installingPos : items.lamp_2[index].position}
                  rotation={items.lamp_2[index].rotation}
                  object={lamp_2_scene}
                />
                <pointLight
                  position={
                    items.lamp_2[index].installing == true
                      ? [installingPos[0], installingPos[1] + 1, installingPos[2]]
                      : [
                          items.lamp_2[index].position[0],
                          items.lamp_2[index].position[1] + 2,
                          items.lamp_2[index].position[2],
                        ]
                  }
                  distance={10}
                  color={'orange'}
                />
              </Suspense>
              {/*  */}(
              {selectedItem && clonedArr[index] === selectedItem ? (
                <>
                  <Html
                    position={
                      items.lamp_2[index].installing == true
                        ? [installingPos[0], installingPos[1] + 3, installingPos[2]]
                        : [
                            items.lamp_2[index].position[0],
                            items.lamp_2[index].position[1] + 3,
                            items.lamp_2[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.lamp_2[index].rotation = [
                          items.lamp_2[index].rotation[0],
                          items.lamp_2[index].rotation[1] + Math.PI / 4,
                          items.lamp_2[index].rotation[2],
                        ]
                        forceUpdate(updateIndex + 1)
                      }}
                      style={{ backgroundColor: 'white', borderRadius: '100%', padding: '10px' }}>
                      🔄️
                    </button>
                  </Html>
                </>
              ) : null}
              ) :
            </>
          )
        }
      })}
    </>
  )
}

export default Lamp2
