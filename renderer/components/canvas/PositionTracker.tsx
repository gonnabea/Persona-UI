// 현재 마우스 위치 표시용 컴포넌트
import { useThree } from '@react-three/fiber'

function PositionTracker() {
  
  const raycaster = useThree((state) => state.raycaster);
  const scene = useThree((state) => state.scene)

    // 마우스 클릭한 지점 위치 얻기
  const closedObjPosition = raycaster.intersectObjects(scene.children)[0]?.point
  const clickedMaterial = raycaster.intersectObjects(scene.children)[0]?.object.material.name

  console.log(raycaster.intersectObjects(scene.children)[0])

  console.log(closedObjPosition)
  console.log(clickedMaterial)


  // return [closedObjPosition, clickedMaterial]
}

export default PositionTracker
