import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { BoxCollider } from './Colliders'
import SoccerBall from './SoccerBall'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useRecoilValue } from 'recoil'

function SoccerField(props) {
  const group = useRef()
  const glb = useGLTF('/models/soccer_field.glb')
  const targetObject = useRef()
  const directionalLight = useRef()
  const colyseusRoom = useRecoilValue(colyseusRoomState)

  //   Object.keys(glb.materials).forEach(function(v){
  //     glb.materials[v].metalness = 1;
  //     glb.materials[v].roughness = 0.8;

  // })

  useEffect(() => {
    const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point

    Object.values(glb.materials).forEach((material) => {
      material.metalness = 0.5
      material.roughness = 0.2
    })
  }, [])

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const findPosition = (e) => {
    // 마우스 클릭한 지점 위치 얻기
    const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point

    console.log(clickedPosition)

    //   console.log(clickedPosition)
  }

  useEffect(() => {
    if (colyseusRoom) {
      colyseusRoom.onMessage('soccerScore', (message) => {
        console.log(message)
      })
    }
  }, [])

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // console.log("Hey, I'm executing every frame!");
    // console.log(a)
  })

  return (
    <Suspense fallback={null}>
      <primitive
        onClick={(e) => findPosition(e)}
        position={[0, -1.3, -60]}
        scale={1}
        rotation={[0, 0, 0]}
        object={glb.scene}
        // visible={false}
      />
      {/* 축구공 */}
      <SoccerBall />

      {/* 골대 1 */}
      <group>
        {/* top */}
        <BoxCollider position={[0, 1, -37.5]} args={[4, 0.1, 2]} />
        {/* bottom */}
        <BoxCollider position={[0, -1, -37.5]} args={[4, 1, 2]} name='team1' />
        {/* back */}
        <BoxCollider position={[0, 0, -36.5]} args={[4, 2, 0.1]} />
        {/* left */}
        <BoxCollider position={[2, -1, -37.5]} args={[0.1, 4, 2]} />
        {/* right */}
        <BoxCollider position={[-2, -1, -37.5]} args={[0.1, 4, 2]} />
      </group>
      {/* 골대 2 */}
      <group>
        {/* top */}
        <BoxCollider position={[0, 1, -82.5]} args={[4, 0.1, 2]} />
        {/* bottom */}
        <BoxCollider position={[0, -1, -82.5]} args={[4, 1, 2]} name='team2' />
        {/* back */}
        <BoxCollider position={[0, 0, -83.5]} args={[4, 2, 0.1]} />
        {/* left */}
        <BoxCollider position={[2, -1, -82.5]} args={[0.1, 4, 2]} />
        {/* right */}
        <BoxCollider position={[-2, -1, -82.5]} args={[0.1, 4, 2]} />
      </group>
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
    </Suspense>
  )
}

export default SoccerField
