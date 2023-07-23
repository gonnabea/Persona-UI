import { isEditModeState } from '@/recoil/isEditMode/atom'
import { itemsState } from '@/recoil/items/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// let justMousemoved = false
let isEditModeVar = false
function Door1() {
  const group = useRef()
  const glb = useGLTF('/models/exterior_items/door_1.glb')

  const [items, setItems] = useRecoilState(itemsState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [installingPos, setInstallingPos] = useState([0, 0, 0])
  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  // 마우스 무브 위치 얻기
  const findMousePosition = (e) => {
    // console.log(e)

    if (isEditModeVar) {
      //   justMousemoved = true
      e.stopPropagation()

      if (
        raycaster.intersectObjects(scene.children)[0] &&
        items.door_1.installed === false &&
        items.door_1.installing === true
      ) {
        const groundTarget = raycaster
          .intersectObjects(scene.children)
          .find((target) => target.object.name === 'ground1')

        if (groundTarget) {
          const mousePosition = groundTarget.point

          // if(items.door_1.installing === true)

          setInstallingPos([mousePosition.x, mousePosition.y, mousePosition.z])

          // setLandClickPos(clickedPosition)
        }
      }
      //   setTimeout(() => {
      //     justMousemoved = false
      //   }, 30)
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

        if (items.door_1.installed === false && items.door_1.installing === true) {
          items.door_1.position = [mousePosition.x, mousePosition.y, mousePosition.z]

          items.door_1.installed = true
          items.door_1.installing = false

          glb.scene.children[0].material.opacity = 1

          glb.scene.children[1].material.opacity = 1

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
    console.log(items.door_1)
    if (items.door_1.installing === true) {
      setSelectedItem(glb.scene)
    }
  }, [items.door_1])

  useEffect(() => {
    if (items.door_1.installing === true) {
      glb.scene.children[0].material.opacity = 0.7
      glb.scene.children[0].material.transparent = true

      glb.scene.children[1].material.opacity = 0.7
      glb.scene.children[1].material.transparent = true
    } else {
      glb.scene.children[0].material.opacity = 1

      glb.scene.children[1].material.opacity = 1
    }
  }, [items.door_1.installing])

  return items.door_1.installing === true || items.door_1.installed === true ? (
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
        scale={[1, 0.6, 0.8]}
        position={items.door_1.installing === true ? installingPos : items.door_1.position}
        rotation={items.door_1.rotation}
        object={glb.scene}
      />
    </Suspense>
  ) : null
}

export default Door1
