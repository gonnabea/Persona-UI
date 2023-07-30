import { isEditModeState } from '@/recoil/isEditMode/atom'
import { itemsState } from '@/recoil/items/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { clone } from '@/utils/SkeletonUtils'
import { useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Bed1() {
  const group = useRef()
  const glb = useGLTF('/models/interior_items/bed_1.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const clonedArr = []

  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    clonedArr.push(cloned)
  }

  // 마우스 무브 위치 얻기
  // 가구 설치 위치 미리보기
  const findMousePosition = (e) => {
    // console.log(e)

    e.stopPropagation()

    const installingModel = items.bed_1.find((bed_1) => bed_1.installing === true)

    console.log(installingModel)

    if (raycaster.intersectObjects(scene.children)[0] && installingModel && installingModel.installed === false) {
      // const wall = raycaster.intersectObjects(scene.children).find(target => target.object.modelInfo?.name === "wall");
      const groundTarget = raycaster.intersectObjects(scene.children).find((target) => target.object.name === 'ground1')
      // console.log(wall)

      if (groundTarget) {
        const mousePosition = groundTarget.point

        // if(items.bed_1.installing === true)

        setInstallingPos([mousePosition.x, mousePosition.y, mousePosition.z])

        // setLandClickPos(clickedPosition)
      }
    }

    //   console.log(clickedPosition)
  }

  // 마우스 클릭한 위치 얻기 - 모델 설치할 곳 선택
  const findClickedPosition = (e) => {
    // console.log(e)

    e.stopPropagation()

    if (raycaster.intersectObjects(scene.children)[0]) {
      const groundTarget = raycaster.intersectObjects(scene.children).find((target) => target.object.name === 'ground1')

      if (groundTarget) {
        const mousePosition = groundTarget.point

        const installingModel = items.bed_1.find((bed_1) => bed_1.installing === true)
        // const installingModelIndex = items.bed_1.findIndex((bed_1) => bed_1.installing === true)

        if (installingModel && installingModel.installed === false) {
          installingModel.position = [mousePosition.x, mousePosition.y, mousePosition.z]

          installingModel.installed = true
          installingModel.installing = false

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
  //     console.log(items.bed_1)
  //     console.log(glb.scene)
  //     if (items.bed_1.installing === true) {
  //       setSelectedItem(glb.scene)
  //     }
  //   }, [items.bed_1])

  // 가구 설치중일 시 투명하게 보이게 하는 로직.
  //   useEffect(() => {
  //     const installingModel = items.bed_1.find((bed_1) => bed_1.installing === true)
  //     const installingModelIndex = items.bed_1.findIndex((bed_1) => bed_1.installing === true)
  //     if (installingModel) {
  //       clonedArr[installingModelIndex].children[0].children[0].children[0].children[0].children.forEach((mesh) => {
  //         // console.log(material)
  //         mesh.material.opacity = 0.5
  //         mesh.material.transparent = true
  //       })
  //     }
  //   }, [items.bed_1])

  return (
    <>
      {clonedArr.map((bed_1_scene, index) => {
        if (items.bed_1[index].installing === true || items.bed_1[index].installed === true) {
          return (
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
                  if (isEditMode) {
                    // e.stopPropagation()
                    items.bed_1[index].installed = false
                    items.bed_1[index].installing = false
                  }
                }}
                // 수정 모드에서 마우스 왼쪽 클릭 시 배치했던 가구 재배치
                onClick={(e) => {
                  if (isEditMode) {
                    console.log(e)
                    items.bed_1[index].installed = false
                    items.bed_1[index].installing = true
                    console.log(items.bed_1[index])
                  }
                }}
                scale={[1, 1, 1]}
                position={items.bed_1[index].installing == true ? installingPos : items.bed_1[index].position}
                rotation={items.bed_1[index].rotation}
                object={bed_1_scene}
              />
            </Suspense>
          )
        }
      })}
    </>
  )
}

export default Bed1

{
  /* <Suspense fallback={null}>
      <primitive
        onClick={(e) => {
          // setSelectedItem((e.eventObject))
          findClickedPosition(e)
        }}
        onDoubleClick={(e) => {
          setSelectedItem(e.eventObject)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
        scale={[1, 1, 1]}
        position={items.bed_1.installing === true ? installingPos : items.bed_1.position}
        rotation={items.bed_1.rotation}
        object={glb.scene}
      />
    </Suspense> */
}
