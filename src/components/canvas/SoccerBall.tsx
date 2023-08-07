import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useSphere } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

let velocity = null
let angularVelocity = null

function SoccerBall(props) {
  const ballModelRef = useRef()
  const glb = useGLTF('/models/soccer_ball.glb')
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)

  //   Object.keys(glb.materials).forEach(function(v){
  //     glb.materials[v].metalness = 1;
  //     glb.materials[v].roughness = 0.8;

  // })

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const [mesh, api] = useSphere(() => ({
    mass: 0.1,
    type: 'Dynamic',
    args: [0.3],
    position: [-1.5799805660188322, -0.5, -61.161431290782154],
    onCollideBegin: (e) => {
      // 콜라이더 id에 따른 분기
      if (e.body.name === 'ground1') {
        console.log('바닥과 충돌')
      } else if (e.body.name === 'stair') {
        console.log('계단과 충돌')
      } else if (e.body.name === 'team1' || e.body.name === 'team2') {
        api.position.set(-1.5799805660188322, -0.5, -61.161431290782154)
      } else if (
        e.body.name === 'soccerfield-border-1' ||
        e.body.name === 'soccerfield-border-2' ||
        e.body.name === 'soccerfield-border-3' ||
        e.body.name === 'soccerfield-border-4'
      ) {
        api.position.set(-1.5799805660188322, -0.5, -61.161431290782154)
        console.log('축구장 경계 바닥과 충돌')
      } else {
        console.log('물체와 충돌')
      }

      // Send ball position
      if (colyseusRoom) {
        const positionMessage = {
          position: ballModelRef.current.position,
          ballId: 'soccer_ball_1',
        }

        colyseusRoom.send('ballSync', positionMessage)

        if (velocity) {
          const velocityMessage = {
            velocity: { x: velocity[0], y: velocity[1], z: velocity[2] },
            angularVelocity: { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
            ballId: 'soccer_ball_1',
          }
          colyseusRoom.send('ballMove', velocityMessage)
        }

        if (e.body.name === 'player') {
          const touchMessage = {
            ballId: 'soccer_ball_1',
            reset: false,
          }
          colyseusRoom.send('ballTouch', touchMessage)
        }
      }
    },

    onCollide: (e) => {
      if (e.body.name === 'ground1') {
        console.log('바닥과 충돌')
      } else if (e.body.name === 'stair') {
        console.log('계단과 충돌')
      } else if (e.body.name === 'team1' || e.body.name === 'team2') {
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
      } else if (
        e.body.name === 'soccerfield-border-1' ||
        e.body.name === 'soccerfield-border-2' ||
        e.body.name === 'soccerfield-border-3' ||
        e.body.name === 'soccerfield-border-4'
      ) {
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
      } else {
        console.log('물체와 충돌')
        if (colyseusRoom) {
          if (velocity) {
            const message = {
              velocity: { x: velocity[0], y: velocity[1], z: velocity[2] },
              angularVelocity: { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
              ballId: 'soccer_ball_1',
            }
            colyseusRoom.send('ballMove', message)
          }
        }
      }
    },

    onCollideEnd: (e) => {
      if (e.body.name === 'ground1') {
        console.log('바닥과 충돌')
      } else if (e.body.name === 'stair') {
        console.log('계단과 충돌')
      } else if (
        e.body.name === 'soccerfield-border-1' ||
        e.body.name === 'soccerfield-border-2' ||
        e.body.name === 'soccerfield-border-3' ||
        e.body.name === 'soccerfield-border-4'
      ) {
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
      } else {
        console.log('물체와 충돌')
        if (colyseusRoom) {
          if (velocity) {
            const message = {
              velocity: { x: velocity[0], y: velocity[1], z: velocity[2] },
              angularVelocity: { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
              ballId: 'soccer_ball_1',
            }
            colyseusRoom.send('ballMove', message)
          }
        }
      }
    },
  }))

  useEffect(() => {
    setTimeout(() => {
      const me = JSON.parse(localStorage.getItem('me'))
      api.velocity.subscribe((value) => {
        velocity = value

        // console.log(velocity)
      })

      api.angularVelocity.subscribe((value) => {
        // console.log(`soccer_ball_1 angularVelocity: ${value}`)
        // setVelocity({
        //   linearVelocity: velocity.linearVelocity,
        //   angularVelocity: {x: value[0], y: value[1], z: value[2]},
        // })
        angularVelocity = value
        // console.log(angularVelocity)
      })

      api.position.subscribe((value) => {
        ballModelRef.current?.position?.setX(value[0])
        ballModelRef.current?.position?.setY(value[1])
        ballModelRef.current?.position?.setZ(value[2])
        // console.log(colyseusRoom)
      })

      api.rotation.subscribe((value) => {
        ballModelRef.current?.rotation?.set(value[0], value[1], value[2])
      })

      colyseusRoom?.onMessage('ballSync', ({ message, clientId }) => {
        const position = message.position

        ballModelRef.current?.position?.setX(position.x)
        ballModelRef.current?.position?.setY(position.y)
        ballModelRef.current?.position?.setZ(position.z)
        api.position.set(position.x, position.y, position.z)
      })

      colyseusRoom?.onMessage('ballMove', ({ message, clientId }) => {
        const linearVelocity = message.velocity
        const angularVelocity = message.angularVelocity

        api.velocity.set(linearVelocity.x, linearVelocity.y, linearVelocity.z)
        api.angularVelocity.set(angularVelocity.x, angularVelocity.y, angularVelocity.z)
      })

      //     colyseusRoom?.onMessage('join', () => {
      //         const usersArr = Array.from(colyseusRoom.state.players.$items.values());

      //       const message = {
      //        position: ballModelRef.current.position,
      //        ballId: 'soccer_ball_1'
      //      }

      //      colyseusRoom.send("ballSync", message)

      //   console.log(usersArr)

      //  if(velocity) {
      //        const message = {
      //              velocity:{x: velocity[0], y: velocity[1], z: velocity[2]},
      //              angularVelocity:{x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2]},
      //              ballId: 'soccer_ball_1'
      //            }
      //            colyseusRoom.send("ballMove", message)

      //    }

      //     } )
    }, 1000)
  }, [])

  // 공 초기 위치 지정
  useEffect(() => {
    console.log(mesh.current.position)
  }, [])

  return (
    <Suspense fallback={null}>
      <primitive ref={ballModelRef} position={[0, 0, 1]} scale={0.3} rotation={props.rotation} object={glb.scene} />
      <mesh name={'soccer_ball_1'} ref={mesh} visible={true}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color='orange' visible={false} />
      </mesh>
    </Suspense>
  )
}

export default SoccerBall
