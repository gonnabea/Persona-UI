import { installingModelNameState } from '@/recoil/intallingModelName/atom'
import { isEditModeState } from '@/recoil/isEditMode/atom'
import { isExteriorInstallingState } from '@/recoil/isExteriorInstalling/atom'
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

let isEditModeVar = false
let installingModelNameVar = ''

function Roof1() {
  const group = useRef()
  const glb = useGLTF('/models/exterior_items/roof_2.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [isExteriorInstalling, setIsExteriorInstalling] = useRecoilState(isExteriorInstallingState)
  const [installingModelName, setInstallingModelName] = useRecoilState(installingModelNameState)

  const [updateIndex, forceUpdate] = useState(0)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const clonedArr = []

  for (let i = 0; i < 20; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    clonedArr.push(cloned)
  }

  // 마우스 무브 위치 얻기
  // 가구 설치 위치 미리보기
  const findMousePosition = (e) => {
    // console.log(e)

    e.stopPropagation()

    if (isEditModeVar && installingModelNameVar === 'roof_1') {
      const installingModel = items.roof_1.find((roof_1) => roof_1.installing === true)

      if (raycaster.intersectObjects(scene.children)[0] && installingModel && installingModel.installed === false) {
        // const wall = raycaster.intersectObjects(scene.children).find(target => target.object.modelInfo?.name === "wall");
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')
        // console.log(wall)

        if (groundTarget) {
          const mousePosition = groundTarget.point

          // if(items.roof_1.installing === true)

          setInstallingPos([mousePosition.x, mousePosition.y + 3.2 + installingModel.heightIndex * 3, mousePosition.z])

          // setLandClickPos(clickedPosition)
        }
      }
    }

    //   console.log(clickedPosition)
  }

  useEffect(() => {
    // alert('sdasd')

    isEditModeVar = isEditMode
  }, [isEditMode])

  useEffect(() => {
    installingModelNameVar = installingModelName
  }, [installingModelName])

  // 마우스 클릭한 위치 얻기 - 모델 설치할 곳 선택
  const findClickedPosition = (e) => {
    // console.log(e)

    e.stopPropagation()

    if (raycaster.intersectObjects(scene.children)[0]) {
      const groundTarget = raycaster.intersectObjects(scene.children).find((target) => target.object.name === 'ground1')

      if (groundTarget) {
        const mousePosition = groundTarget.point

        const installingModelState = items.roof_1.find((roof_1) => roof_1.installing === true)
        const installingModelStateIndex = items.roof_1.findIndex((roof_1) => roof_1.installing === true)
        const installingModel = clonedArr[installingModelStateIndex]
        // console.log(mousePosition.y + 3.2 + installingModelState.heightIndex * 3)
        if (installingModelState && installingModelState.installed === false) {
          installingModelState.position = [
            mousePosition.x,
            mousePosition.y + 3.2 + installingModelState.heightIndex * 3,
            mousePosition.z,
          ]

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
  //     console.log(items.roof_1)
  //     console.log(glb.scene)
  //     if (items.roof_1.installing === true) {
  //       setSelectedItem(glb.scene)
  //     }
  //   }, [items.roof_1])

  // 가구 설치중일 시 투명하게 보이게 하는 로직.
  //   useEffect(() => {
  //     const installingModel = items.roof_1.find((roof_1) => roof_1.installing === true)
  //     const installingModelIndex = items.roof_1.findIndex((roof_1) => roof_1.installing === true)
  //     if (installingModel) {
  //       clonedArr[installingModelIndex].children[0].children[0].children[0].children[0].children.forEach((mesh) => {
  //         // console.log(material)
  //         mesh.material.opacity = 0.5
  //         mesh.material.transparent = true
  //       })
  //     }
  //   }, [items.roof_1])

  return (
    <>
      {clonedArr.map((roof_1_scene, index) => {
        if (
          ((items.roof_1[index]?.installing === true || items.roof_1[index]?.installed === true) &&
            installingModelName !== 'floor' &&
            installingModelName !== 'wall' &&
            isExteriorInstalling === true) ||
          isEditMode === false
        ) {
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
                      items.roof_1[index].installed = false
                      items.roof_1[index].installing = false
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
                      console.log(e)
                      items.roof_1[index].installed = false
                      items.roof_1[index].installing = true
                      // window.addEventListener('mousemove', (e) => findMousePosition(e))
                      setSelectedItem(e.eventObject)

                      setInstallingModelName('roof_1')

                      // setItems({ ...items, roof_1: items.roof_1 })
                      console.log(items.roof_1[index])
                    }
                  }}
                  scale={[
                    items.roof_1[index]?.scale[0],
                    items.roof_1[index]?.scale[1] + 0.5,
                    items.roof_1[index]?.scale[2],
                  ]}
                  position={items.roof_1[index]?.installing == true ? installingPos : items.roof_1[index]?.position}
                  rotation={items.roof_1[index]?.rotation}
                  object={roof_1_scene}
                />
              </Suspense>
              {/*  */}(
              {selectedItem && clonedArr[index] === selectedItem ? (
                <>
                  {/* 높이 위로 올리는 버튼 */}
                  <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0], installingPos[1] + 3, installingPos[2]]
                        : [
                            items.roof_1[index].position[0],
                            items.roof_1[index].position[1] + 3,
                            items.roof_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.roof_1[index].position = [
                          items.roof_1[index].position[0],
                          items.roof_1[index].position[1] + 3,
                          items.roof_1[index].position[2],
                        ]

                        items.roof_1[index].heightIndex += 1

                        forceUpdate(updateIndex + 1)
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      ⬆️
                    </button>
                  </Html>{' '}
                  {/* 높이 아래로 내리는 버튼 */}
                  <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0], installingPos[1] - 3, installingPos[2]]
                        : [
                            items.roof_1[index].position[0],
                            items.roof_1[index].position[1] - 3,
                            items.roof_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.roof_1[index].position = [
                          items.roof_1[index].position[0],
                          items.roof_1[index].position[1] - 3,
                          items.roof_1[index].position[2],
                        ]

                        items.roof_1[index].heightIndex -= 1

                        forceUpdate(updateIndex + 1)
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      ⬇️
                    </button>
                  </Html>
                  {/* 모델 회전 버튼 */}
                  {/* <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0], installingPos[1], installingPos[2]]
                        : [
                            items.roof_1[index].position[0],
                            items.roof_1[index].position[1],
                            items.roof_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.roof_1[index].position = [
                          items.roof_1[index].position[0],
                          items.roof_1[index].position[1],
                          items.roof_1[index].position[2],
                        ]
                        items.roof_1[index].rotation = [
                          items.roof_1[index].rotation[0],
                          items.roof_1[index].rotation[1] + Math.PI / 2,
                          items.roof_1[index].rotation[2],
                        ]
                        forceUpdate(updateIndex + 1)
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      🔄️
                    </button>
                  </Html> */}
                  {/* 가로 크기 키우기 버튼 */}
                  <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0] + 3, installingPos[1], installingPos[2]]
                        : [
                            items.roof_1[index].position[0] + 3 + items.roof_1[index].scale[0],
                            items.roof_1[index].position[1],
                            items.roof_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (items.roof_1[index].scale[0] < 15) {
                          items.roof_1[index].scale = [
                            items.roof_1[index].scale[0] + 0.2,
                            items.roof_1[index].scale[1],
                            items.roof_1[index].scale[2],
                          ]

                          forceUpdate(updateIndex + 1)
                        }
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      ➕
                    </button>
                  </Html>
                  {/* 세로 크기 키우기 버튼 */}
                  <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0], installingPos[1], installingPos[2] + 3]
                        : [
                            items.roof_1[index].position[0],
                            items.roof_1[index].position[1],
                            items.roof_1[index].position[2] + 3 + items.roof_1[index].scale[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (items.roof_1[index].scale[2] < 15) {
                          items.roof_1[index].scale = [
                            items.roof_1[index].scale[0],
                            items.roof_1[index].scale[1],
                            items.roof_1[index].scale[2] + 0.2,
                          ]

                          forceUpdate(updateIndex + 1)
                        }
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      ➕
                    </button>
                  </Html>
                  {/* 가로 크기 축소 버튼 */}
                  <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0] - 3, installingPos[1], installingPos[2]]
                        : [
                            items.roof_1[index].position[0] - 3 - items.roof_1[index].scale[0],
                            items.roof_1[index].position[1],
                            items.roof_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (items.roof_1[index].scale[0] > 1) {
                          items.roof_1[index].scale = [
                            items.roof_1[index].scale[0] - 0.2,
                            items.roof_1[index].scale[1],
                            items.roof_1[index].scale[2],
                          ]

                          forceUpdate(updateIndex + 1)
                        }
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      ➖
                    </button>
                  </Html>
                  {/* 세로 크기 축소 버튼 */}
                  <Html
                    position={
                      items.roof_1[index].installing == true
                        ? [installingPos[0], installingPos[1], installingPos[2] - 3]
                        : [
                            items.roof_1[index].position[0],
                            items.roof_1[index].position[1],
                            items.roof_1[index].position[2] - 3 - items.roof_1[index].scale[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (items.roof_1[index].scale[2] > 1) {
                          items.roof_1[index].scale = [
                            items.roof_1[index].scale[0],
                            items.roof_1[index].scale[1],
                            items.roof_1[index].scale[2] - 0.2,
                          ]

                          forceUpdate(updateIndex + 1)
                        }
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                        opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      ➖
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

export default Roof1
