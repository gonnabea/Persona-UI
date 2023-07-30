import { isEditModeState } from '@/recoil/isEditMode/atom'
import { itemsState } from '@/recoil/items/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { clone } from '@/utils/SkeletonUtils'
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let isEditModeVar = false
function Floor1() {
  const group = useRef()
  const glb = useGLTF('/models/exterior_items/floor_1.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const clonedArr = []

  for (let i = 0; i < 10; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cloned = useMemo(() => clone(glb.scene), [scene])

    clonedArr.push(cloned)
  }

  // 마우스 무브 위치 얻기
  const findMousePosition = (e) => {
    if (isEditModeVar) {
      e.stopPropagation()

      if (
        raycaster.intersectObjects(scene.children)[0] &&
        items.floor_1.installed === false &&
        items.floor_1.installing === true
      ) {
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')

        if (groundTarget) {
          const mousePosition = groundTarget.point

          // if(items.floor_1.installing === true)

          setInstallingPos([mousePosition.x, mousePosition.y + 1, mousePosition.z])

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

  // 마우스 클릭한 위치 얻기
  const findClickedPosition = (e) => {
    // console.log(e)

    e.stopPropagation()

    if (raycaster.intersectObjects(scene.children)[0]) {
      const groundTarget = raycaster.intersectObjects(scene.children).find((target) => target.object.name === 'ground1')

      if (groundTarget) {
        const mousePosition = groundTarget.point

        if (items.floor_1.installed === false && items.floor_1.installing === true) {
          items.floor_1.position = [mousePosition.x, mousePosition.y + 1, mousePosition.z]

          items.floor_1.installed = true
          items.floor_1.installing = false

          glb.scene.children.forEach((mesh) => {
            mesh.material.opacity = 1
          })

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

  useEffect(() => {
    console.log(items.floor_1)
    console.log(glb.scene)
    if (items.floor_1.installing === true) {
      setSelectedItem(glb.scene)
    }
  }, [items.floor_1])

  useEffect(() => {
    if (items.floor_1.installing === true) {
      glb.scene.children.forEach((mesh) => {
        mesh.material.opacity = 0.7
        mesh.material.transparent = true
      })
    } else {
      glb.scene.children.forEach((mesh) => {
        mesh.material.opacity = 1
      })
    }
  }, [items.floor_1.installing])

  return items.floor_1.installing === true || items.floor_1.installed === true ? (
    <Suspense fallback={null}>
      <primitive
        onClick={(e) => {
          setSelectedItem(e.eventObject)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
        name={'floor_1'}
        scale={[0.5, 0.5, 0.5]}
        position={items.floor_1.installing === true ? installingPos : items.floor_1.position}
        rotation={items.floor_1.rotation}
        object={glb.scene}
      />
    </Suspense>
  ) : null
}

export default Floor1
