import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useSphere } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { SphereCollider } from './Colliders'

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
      if (e.body.name === 'ground1') {
        console.log('바닥과 충돌')
        if (colyseusRoom) {
          const me = JSON.parse(localStorage.getItem('me'))
          const usersArr = Array.from(colyseusRoom.state.players.$items.values())

          const message = {
            position: ballModelRef.current.position,
            ballId: 'soccer_ball_1',
          }
          colyseusRoom.send('ballSync', message)

          if (velocity) {
            const message = {
              velocity: { x: velocity[0], y: velocity[1], z: velocity[2] },
              angularVelocity: { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
              ballId: 'soccer_ball_1',
            }
            colyseusRoom.send('ballMove', message)
          }
        }
      } else if (e.body.name === 'stair') {
        console.log('계단과 충돌')
      } else if (e.body.name === 'team1' || e.body.name === 'team2') {
        if (colyseusRoom) {
          const scoreMessage = {
            soccerScoreId: 'soccer_score_1',
            team: e.body.name,
            type: 'increase',
          }

          // 점수 전송
          colyseusRoom.send('soccerScore', scoreMessage)
          // 위치 초기화
          api.position.set(-1.5799805660188322, -0.5, -61.161431290782154)
          api.angularVelocity.set(0, 0, 0)
          api.velocity.set(0, 0, 0)
        }
      } else {
        console.log('물체와 충돌')
        if (colyseusRoom) {
          const me = JSON.parse(localStorage.getItem('me'))
          const usersArr = Array.from(colyseusRoom.state.players.$items.values())

          const message = {
            position: ballModelRef.current.position,
            ballId: 'soccer_ball_1',
          }
          colyseusRoom.send('ballSync', message)

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

    onCollide: (e) => {
      if (e.body.name === 'ground1') {
        console.log('바닥과 충돌')
      } else if (e.body.name === 'stair') {
        console.log('계단과 충돌')
      } else {
        console.log('물체와 충돌')
        if (colyseusRoom) {
          const me = JSON.parse(localStorage.getItem('me'))
          const usersArr = Array.from(colyseusRoom.state.players.$items.values())

          console.log(e)

          console.log(usersArr)

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
      } else {
        console.log('물체와 충돌')
        if (colyseusRoom) {
          const me = JSON.parse(localStorage.getItem('me'))
          const usersArr = Array.from(colyseusRoom.state.players.$items.values())

          console.log(e)

          console.log(usersArr)

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
        console.log(message)

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

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()

    // console.log("Hey, I'm executing every frame!");
    // console.log(a)

    // ballModelRef.current.position.set([mesh.current.position.x, mesh.current.position.y, mesh.current.position.z])
  })

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
