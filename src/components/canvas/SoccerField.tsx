import { Html, Text, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { BoxCollider } from './Colliders'
import SoccerBall from './SoccerBall'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useRecoilValue } from 'recoil'
import { CollideBeginEvent } from '@react-three/cannon'

type ScoreType = {
  clientId: string
  message: {
    id: string
    team1: number
    team2: number
  }
}

function SoccerField(props) {
  const group = useRef()
  const glb = useGLTF('/models/soccer_field.glb')
  const targetObject = useRef()
  const directionalLight = useRef()
  const colyseusRoom = useRecoilValue(colyseusRoomState)
  const [score, setScore] = useState<ScoreType>({
    clientId: '',
    message: {
      id: '',
      team1: 0,
      team2: 0,
    },
  })

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

  useEffect(() => {
    if (colyseusRoom) {
      colyseusRoom.onMessage('soccerScore', (message) => {
        setScore(message)
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
        <BoxCollider
          position={[0, -1.5, -37.5]}
          args={[4, 1, 2]}
          name='team1'
          onCollideBegin={(e: CollideBeginEvent) => {
            onGoal(e, 'team1')
          }}
        />
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
        <BoxCollider
          position={[0, -1.5, -82.5]}
          args={[4, 1, 2]}
          name='team2'
          onCollideBegin={(e: CollideBeginEvent) => {
            onGoal(e, 'team2')
          }}
        />
        {/* back */}
        <BoxCollider position={[0, 0, -83.5]} args={[4, 2, 0.1]} />
        {/* left */}
        <BoxCollider position={[2, -1, -82.5]} args={[0.1, 4, 2]} />
        {/* right */}
        <BoxCollider position={[-2, -1, -82.5]} args={[0.1, 4, 2]} />
      </group>
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}

      {/* 전광판 1 */}
      <mesh position={[11, 10, -60]} rotation={[0, -1.570796, 0]}>
        <Text position={[-1, 0, 0.2]}>{score.message?.team2 ?? 0}</Text>
        <Text position={[0, 0, 0.2]}>:</Text>
        <Text position={[1, 0, 0.2]}>{score.message?.team1 ?? 0}</Text>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color='skyblue' opacity={0.3} />
      </mesh>
    </Suspense>
  )
}

export default SoccerField
