import { installingModelNameState } from '@/recoil/intallingModelName/atom'
import { isEditModeState } from '@/recoil/isEditMode/atom'
import { itemsState } from '@/recoil/items/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { clone } from '@/utils/SkeletonUtils'
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let isEditModeVar = false
let installingModelNameVar = ''

function Window1() {
  const group = useRef()
  const glb = useGLTF('/models/exterior_items/window_001.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [installingModelName, setInstallingModelName] = useRecoilState(installingModelNameState)

  const [updateIndex, forceUpdate] = useState(0)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const clonedArr = []

  const animationActionArr = []

  const doorRefArr = []

  const isDoorOpenedArr = []

  for (let i = 0; i < 10; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const doorRef = useRef()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { actions: windowActions } = useAnimations(glb.animations, doorRef)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDoorOpened, setIsDoorOpened] = useState(false)

    doorRefArr.push(doorRef)

    animationActionArr.push(windowActions)

    clonedArr.push(cloned)

    // cloned.children[0].material.transparency = true
    // cloned.children[0].material.opacity = 0.7

    cloned.children[0].children[0].material.transparency = true
    cloned.children[0].children[0].material.opacity = 0.7

    cloned.children[1].children[0].material.transparency = true
    cloned.children[1].children[0].material.opacity = 0.7

    // console.log(cloned)

    isDoorOpenedArr.push([isDoorOpened, setIsDoorOpened])
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
    if (isEditModeVar && installingModelNameVar === 'window_1') {
      e.stopPropagation()

      const installingModel = items.window_1.find((window_1) => window_1.installing === true)

      if (raycaster.intersectObjects(scene.children)[0] && installingModel && installingModel.installed === false) {
        // const wall = raycaster.intersectObjects(scene.children).find(target => target.object.modelInfo?.name === "wall");
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')
        // console.log(wall)

        if (groundTarget) {
          const mousePosition = groundTarget.point

          // if(items.window_1.installing === true)

          setInstallingPos([
            mousePosition.x + 1,
            mousePosition.y + installingModel.heightIndex * 3,
            mousePosition.z + 1,
          ])

          // setLandClickPos(clickedPosition)
        }
      }
    }
    //   console.log(clickedPosition)
  }

  // 마우스 클릭한 위치 얻기 - 모델 설치할 곳 선택
  const findClickedPosition = (e) => {
    console.log(e)

    e.stopPropagation()

    if (isEditModeVar === true && installingModelNameVar === 'window_1') {
      if (raycaster.intersectObjects(scene.children)[0]) {
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')

        if (groundTarget) {
          const mousePosition = groundTarget.point

          const installingModelState = items.window_1.find((window_1) => window_1.installing === true)
          const installingModelStateIndex = items.window_1.findIndex((window_1) => window_1.installing === true)
          const installingModel = clonedArr[installingModelStateIndex]

          if (installingModelState && installingModelState.installed === false) {
            installingModelState.position = [
              mousePosition.x + 1,
              mousePosition.y + installingModelState.heightIndex * 3,
              mousePosition.z + 1,
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
  //     console.log(items.window_1)
  //     console.log(glb.scene)
  //     if (items.window_1.installing === true) {
  //       setSelectedItem(glb.scene)
  //     }
  //   }, [items.window_1])

  // 가구 설치중일 시 투명하게 보이게 하는 로직.
  //   useEffect(() => {
  //     const installingModel = items.window_1.find((window_1) => window_1.installing === true)
  //     const installingModelIndex = items.window_1.findIndex((window_1) => window_1.installing === true)
  //     if (installingModel) {
  //       clonedArr[installingModelIndex].children[0].children[0].children[0].children[0].children.forEach((mesh) => {
  //         // console.log(material)
  //         mesh.material.opacity = 0.5
  //         mesh.material.transparent = true
  //       })
  //     }
  //   }, [items.window_1])

  return (
    <>
      {clonedArr.map((window_1_scene, index) => {
        if (items.window_1[index]?.installing === true || items.window_1[index]?.installed === true) {
          return (
            <>
              <Suspense key={index} fallback={null}>
                <primitive
                  ref={doorRefArr[index]}
                  onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor = 'default'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  // 수정 모드에서 가구 마우스 오른쪽 클릭 시 가구 제거
                  onContextMenu={(e) => {
                    e.stopPropagation()
                    if (isEditMode) {
                      // e.stopPropagation()
                      items.window_1[index].installed = false
                      items.window_1[index].installing = false
                      forceUpdate(updateIndex + 1)
                    }
                  }}
                  // 수정 모드에서 마우스 왼쪽 더블 클릭 시 배치했던 가구 재배치
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    if (isEditMode) {
                      console.log(e)
                      items.window_1[index].installed = false
                      items.window_1[index].installing = true
                      // window.addEventListener('mousemove', (e) => findMousePosition(e))
                      setSelectedItem(e.eventObject)

                      setInstallingModelName('window_1')

                      // setItems({ ...items, window_1: items.window_1 })
                      console.log(items.window_1[index])
                    }

                    if (!isEditMode) {
                      console.log(animationActionArr[index])
                      const [isDoorOpened, setIsDoorOpened] = isDoorOpenedArr[index]
                      if (isDoorOpened === true) {
                        // 오른쪽 창문 닫기 애니메이션 재생
                        animationActionArr[index].door_open_right.stop()

                        animationActionArr[index].door_close_right.repetitions = 0
                        animationActionArr[index].door_close_right.play()

                        animationActionArr[index].door_close_right.clampWhenFinished = true
                        animationActionArr[index].door_close_right.reset()

                        // 왼쪽 창문 닫기 애니메이션 재생
                        animationActionArr[index].door_open_left.stop()

                        animationActionArr[index].door_close_left.repetitions = 0
                        animationActionArr[index].door_close_left.play()

                        animationActionArr[index].door_close_left.clampWhenFinished = true
                        animationActionArr[index].door_close_left.reset()

                        setIsDoorOpened(false)
                      }

                      if (isDoorOpened === false) {
                        // 오른쪽 창문 열기 애니메이션 재생
                        animationActionArr[index].door_close_right.stop()

                        animationActionArr[index].door_open_right.repetitions = 0
                        animationActionArr[index].door_open_right.play()

                        animationActionArr[index].door_open_right.clampWhenFinished = true
                        animationActionArr[index].door_open_right.reset()

                        // 왼쪽 창문 열기 애니메이션 재생
                        animationActionArr[index].door_close_left.stop()

                        animationActionArr[index].door_open_left.repetitions = 0
                        animationActionArr[index].door_open_left.play()

                        animationActionArr[index].door_open_left.clampWhenFinished = true
                        animationActionArr[index].door_open_left.reset()

                        setIsDoorOpened(true)
                      }
                    }
                  }}
                  scale={[2, 1.1, 0.9]}
                  position={items.window_1[index].installing == true ? installingPos : items.window_1[index].position}
                  rotation={items.window_1[index].rotation}
                  object={window_1_scene}
                />
              </Suspense>
              {/*  */}(
              {selectedItem && clonedArr[index] === selectedItem ? (
                <>
                  {/* 모델 회전시키는 버튼 */}
                  <Html
                    position={
                      items.window_1[index].installing == true
                        ? [installingPos[0], installingPos[1], installingPos[2]]
                        : [
                            items.window_1[index].position[0],
                            items.window_1[index].position[1],
                            items.window_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.window_1[index].rotation = [
                          items.window_1[index].rotation[0],
                          items.window_1[index].rotation[1] + Math.PI / 2,
                          items.window_1[index].rotation[2],
                        ]
                        forceUpdate(updateIndex + 1)
                      }}
                      style={{ backgroundColor: 'white', borderRadius: '100%', padding: '10px' }}>
                      🔄️
                    </button>
                  </Html>
                  {/* 높이 위로 올리는 버튼 */}
                  <Html
                    position={
                      items.window_1[index].installing == true
                        ? [installingPos[0], installingPos[1] + 3, installingPos[2]]
                        : [
                            items.window_1[index].position[0],
                            items.window_1[index].position[1] + 3,
                            items.window_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.window_1[index].position = [
                          items.window_1[index].position[0],
                          items.window_1[index].position[1] + 3,
                          items.window_1[index].position[2],
                        ]

                        items.window_1[index].heightIndex += 1

                        forceUpdate(updateIndex + 1)
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                      }}>
                      ⬆️
                    </button>
                  </Html>{' '}
                  {/* 높이 아래로 내리는 버튼 */}
                  <Html
                    position={
                      items.window_1[index].installing == true
                        ? [installingPos[0], installingPos[1] - 3, installingPos[2]]
                        : [
                            items.window_1[index].position[0],
                            items.window_1[index].position[1] - 3,
                            items.window_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.window_1[index].position = [
                          items.window_1[index].position[0],
                          items.window_1[index].position[1] - 3,
                          items.window_1[index].position[2],
                        ]

                        items.window_1[index].heightIndex -= 1

                        forceUpdate(updateIndex + 1)
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '10px',
                      }}>
                      ⬇️
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

export default Window1
