import { installingModelNameState } from '@/recoil/intallingModelName/atom'
import { isEditModeState } from '@/recoil/isEditMode/atom'
import { itemsState } from '@/recoil/items/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { clone } from '@/utils/SkeletonUtils'
import { useBox } from '@react-three/cannon'
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let isEditModeVar = false
let installingModelNameVar = ''

function Door1() {
  const group = useRef()
  const glb = useGLTF('/models/exterior_items/door_001.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [installingModelName, setInstallingModelName] = useRecoilState(installingModelNameState)

  const [updateIndex, forceUpdate] = useState(0)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const clonedArr = []

  const boxColliders = []

  const animationActionArr = []

  const doorRefArr = []

  const isDoorOpenedArr = []

  const [removedArr, setRemovedArr] = useState([])

  for (let i = 0; i < 10; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mesh, api] = useBox(() => ({
      mass: 1,
      type: 'Static',
      rotation: [0, 0, 0],
      position: [0, 0, 0],
      args: [1.7, 6, 0.1],

      onCollide: (e) => {
        // console.log(e)
      },
    }))

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const doorRef = useRef()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { actions: doorActions } = useAnimations(glb.animations, doorRef)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDoorOpened, setIsDoorOpened] = useState(true)

    doorRefArr.push(doorRef)

    animationActionArr.push(doorActions)

    clonedArr.push(cloned)

    boxColliders.push({ mesh: mesh, api })

    // console.log(cloned)

    cloned.children[0].children[0].material.transparency = true
    cloned.children[0].children[0].material.opacity = 0.4

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
    if (isEditModeVar && installingModelNameVar === 'door_1') {
      e.stopPropagation()

      const installingModel = items.door_1.find((door_1) => door_1.installing === true)

      if (raycaster.intersectObjects(scene.children)[0] && installingModel && installingModel.installed === false) {
        // const wall = raycaster.intersectObjects(scene.children).find(target => target.object.modelInfo?.name === "wall");
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')
        // console.log(wall)

        if (groundTarget) {
          const mousePosition = groundTarget.point

          // if(items.door_1.installing === true)

          setInstallingPos([mousePosition.x, mousePosition.y, mousePosition.z])

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

    if (isEditModeVar === true && installingModelNameVar === 'door_1') {
      if (raycaster.intersectObjects(scene.children)[0]) {
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')

        if (groundTarget) {
          const mousePosition = groundTarget.point

          const installingModelState = items.door_1.find((door_1) => door_1.installing === true)
          const installingModelStateIndex = items.door_1.findIndex((door_1) => door_1.installing === true)
          const installingModel = clonedArr[installingModelStateIndex]

          if (installingModelState && installingModelState.installed === false) {
            installingModelState.position = [mousePosition.x, mousePosition.y, mousePosition.z]

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

  // 수정모드 전환 시 문을 위한 콜라이더 배치
  useEffect(() => {
    clonedArr.forEach((cloned, index) => {
      const [isDoorOpened, setIsDoorOpened] = isDoorOpenedArr[index]

      if (isDoorOpened === false) {
        forceUpdate(updateIndex + 1)
        boxColliders[index].mesh.current.position.setX(cloned.position.x)
        boxColliders[index].mesh.current.position.setY(cloned.position.y)
        boxColliders[index].mesh.current.position.setZ(cloned.position.z)

        boxColliders[index].api.position.set(
          cloned.rotation.y === 0 ? cloned.position.x + 1 : cloned.position.x,
          cloned.position.y,
          cloned.rotation.y === 0 ? cloned.position.z : cloned.position.z - 1,
        )
        boxColliders[index].api.rotation.set(cloned.rotation.x, cloned.rotation.y, cloned.rotation.z)
      }
    })
  }, [isEditMode])

  //   useEffect(() => {
  //     console.log(items.door_1)
  //     console.log(glb.scene)
  //     if (items.door_1.installing === true) {
  //       setSelectedItem(glb.scene)
  //     }
  //   }, [items.door_1])

  // 가구 설치중일 시 투명하게 보이게 하는 로직.
  //   useEffect(() => {
  //     const installingModel = items.door_1.find((door_1) => door_1.installing === true)
  //     const installingModelIndex = items.door_1.findIndex((door_1) => door_1.installing === true)
  //     if (installingModel) {
  //       clonedArr[installingModelIndex].children[0].children[0].children[0].children[0].children.forEach((mesh) => {
  //         // console.log(material)
  //         mesh.material.opacity = 0.5
  //         mesh.material.transparent = true
  //       })
  //     }
  //   }, [items.door_1])

  return (
    <>
      {clonedArr.map((door_1_scene, index) => {
        if (items.door_1[index]?.installing === true || items.door_1[index]?.installed === true) {
          return (
            <>
              <Suspense key={index} fallback={null}>
                <primitive
                  key={index}
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
                  onContextMenu={(e) => {
                    e.stopPropagation()
                    // 수정 모드에서 가구 마우스 오른쪽 클릭 시 가구 제거
                    if (isEditMode) {
                      // e.stopPropagation()
                      door_1_scene.position.set(1000, 1000, 1000)

                      boxColliders[index].mesh.current.position.setX(1000)
                      boxColliders[index].mesh.current.position.setY(1000)
                      boxColliders[index].mesh.current.position.setZ(1000)

                      boxColliders[index].api.position.set(1000, 1000, 1000)
                      items.door_1[index].installed = false
                      items.door_1[index].installing = false

                      console.log(boxColliders[index].api)

                      setRemovedArr([...removedArr, { collider: boxColliders[index], model: door_1_scene }])

                      forceUpdate(updateIndex + 1)
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    // 수정 모드에서 마우스 왼쪽 더블 클릭 시 배치했던 가구 재배치
                    if (isEditMode) {
                      console.log(e)
                      items.door_1[index].installed = false
                      items.door_1[index].installing = true
                      // window.addEventListener('mousemove', (e) => findMousePosition(e))
                      setSelectedItem(e.eventObject)

                      setInstallingModelName('door_1')

                      boxColliders[index].mesh.current.position.setX(1000)
                      boxColliders[index].mesh.current.position.setY(1000)
                      boxColliders[index].mesh.current.position.setZ(1000)

                      boxColliders[index].api.position.set(1000, 1000, 1000)

                      // setItems({ ...items, door_1: items.door_1 })
                      console.log(items.door_1[index])
                    }

                    if (!isEditMode) {
                      console.log(animationActionArr[index].door_open01)
                      const [isDoorOpened, setIsDoorOpened] = isDoorOpenedArr[index]
                      if (isDoorOpened === true) {
                        // forceUpdate(updateIndex + 1)

                        // 문 닫기 애니메이션
                        animationActionArr[index].door_open01.stop()

                        animationActionArr[index].door_close.repetitions = 0
                        animationActionArr[index].door_close.play()

                        setIsDoorOpened(false)
                        animationActionArr[index].door_close.clampWhenFinished = true
                        animationActionArr[index].door_close.reset()

                        // 문 닫을 떄 콜라이더 재배치

                        boxColliders[index].api.position.set(
                          door_1_scene.rotation.y === 0 ? door_1_scene.position.x + 1 : door_1_scene.position.x,
                          door_1_scene.position.y,
                          door_1_scene.rotation.y === 0 ? door_1_scene.position.z : door_1_scene.position.z - 1,
                        )

                        boxColliders[index].api.rotation.set(
                          door_1_scene.rotation.x,
                          door_1_scene.rotation.y,
                          door_1_scene.rotation.z,
                        )
                        // boxColliders[index].mesh.current.position.setX(door_1_scene.position.x + 1)
                        // boxColliders[index].mesh.current.position.setY(door_1_scene.position.y)
                        // boxColliders[index].mesh.current.position.setZ(door_1_scene.position.z)

                        // boxColliders[index].mesh.current.rotation.setX(door_1_scene.rotation.x)
                        // boxColliders[index].mesh.current.rotation.setY(door_1_scene.rotation.y)
                        // boxColliders[index].mesh.current.rotation.setZ(door_1_scene.rotation.z)
                      }

                      if (isDoorOpened === false) {
                        // 문 열기 애니메이션
                        animationActionArr[index].door_close.stop()

                        animationActionArr[index].door_open01.repetitions = 0
                        animationActionArr[index].door_open01.play()

                        setIsDoorOpened(true)
                        animationActionArr[index].door_open01.clampWhenFinished = true
                        animationActionArr[index].door_open01.reset()

                        boxColliders[index].mesh.current.position.setX(1000)
                        boxColliders[index].mesh.current.position.setY(1000)
                        boxColliders[index].mesh.current.position.setZ(1000)

                        boxColliders[index].api.position.set(1000, 1000, 1000)
                      }
                    }
                  }}
                  scale={[1.1, 1.23, 1]}
                  position={items.door_1[index].installing == true ? installingPos : items.door_1[index].position}
                  rotation={items.door_1[index].rotation}
                  object={door_1_scene}
                />
              </Suspense>
              {/* <mesh ref={boxColliders[index].mesh} visible={true}>
                <boxGeometry
                  // args={clonedArr[index]}

                  args={[1.7, 6, 0.1]}
                />
                <meshStandardMaterial color='orange' visible={true} />
              </mesh> */}
              {/*  */}(
              {selectedItem && clonedArr[index] === selectedItem ? (
                <>
                  <Html
                    position={
                      items.door_1[index].installing == true
                        ? [installingPos[0], installingPos[1] + 3, installingPos[2]]
                        : [
                            items.door_1[index].position[0],
                            items.door_1[index].position[1] + 3,
                            items.door_1[index].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.door_1[index].rotation = [
                          items.door_1[index].rotation[0],
                          items.door_1[index].rotation[1] === 0 ? Math.PI / 2 : 0,
                          items.door_1[index].rotation[2],
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

export default Door1
