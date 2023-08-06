import { Html, Text, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { BoxCollider } from './Colliders'
import SoccerBall from './SoccerBall'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useRecoilValue } from 'recoil'
import { CollideBeginEvent } from '@react-three/cannon'

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

  const onGoal = (e: CollideBeginEvent, team: 'team1' | 'team2') => {
    // 골대바닥에 축구공 충돌 여부와 콜리세우스 객체 있는지 확인
    if (colyseusRoom && e.body.name === 'soccer_ball_1') {
      const scoreMessage = {
        soccerScoreId: 'soccer_score_1',
        ballId: 'soccer_ball_1',
        team,
        type: 'increase',
      }

      // 점수 전송
      colyseusRoom.send('soccerScore', scoreMessage)
    }
  }

  const findPosition = (e) => {
    // 마우스 클릭한 지점 위치 얻기
    const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point

    console.log(clickedPosition)

    //   console.log(clickedPosition)
  }

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
        <BoxCollider position={[0, 1, -37.5]} args={[4, 0.1, 2]} visible={false} />
        {/* bottom */}
        <BoxCollider
          position={[0, -1.5, -37.5]}
          args={[4, 1, 2]}
          name='team1'
          onCollideBegin={(e: CollideBeginEvent) => {
            onGoal(e, 'team1')
          }}
          visible={false}
        />
        {/* back */}
        <BoxCollider position={[0, 0, -36.5]} args={[4, 2, 0.1]} visible={false} />
        {/* left */}
        <BoxCollider position={[2, -1, -37.5]} args={[0.1, 4, 2]} visible={false} />
        {/* right */}
        <BoxCollider position={[-2, -1, -37.5]} args={[0.1, 4, 2]} visible={false} />
      </group>
      {/* 골대 2 */}
      <group>
        {/* top */}
        <BoxCollider position={[0, 1, -82.5]} args={[4, 0.1, 2]} visible={false} />
        {/* bottom */}
        <BoxCollider
          position={[0, -1.5, -82.5]}
          args={[4, 1, 2]}
          name='team2'
          onCollideBegin={(e: CollideBeginEvent) => {
            onGoal(e, 'team2')
          }}
          visible={false}
        />
        {/* back */}
        <BoxCollider position={[0, 0, -83.5]} args={[4, 2, 0.1]} visible={false} />
        {/* left */}
        <BoxCollider position={[2, -1, -82.5]} args={[0.1, 4, 2]} visible={false} />
        {/* right */}
        <BoxCollider position={[-2, -1, -82.5]} args={[0.1, 4, 2]} visible={false} />
      </group>

      {/* 축구장을 두르고 있는 바닥 콜라이더 */}
      <group>
        <BoxCollider
          position={[16.035457210710149, -1, -60.83751896223613]}
          args={[3, 0.1, 50]}
          visible={false}
          name='soccerfield-border-1'
        />
        <BoxCollider
          position={[-16, -1, -60.83751896223613]}
          args={[3, 0.1, 50]}
          visible={false}
          name='soccerfield-border-2'
        />
        <BoxCollider
          position={[-0.7667139636867977, -1, -87.62388279411937]}
          args={[35, 0.1, 3]}
          visible={false}
          name='soccerfield-border-3'
        />
        <BoxCollider
          position={[0.7667139636867977, -1, -34.62388279411937]}
          args={[35, 0.1, 3]}
          visible={false}
          name='soccerfield-border-4'
        />
      </group>
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
    </Suspense>
  )
}

export default SoccerField
