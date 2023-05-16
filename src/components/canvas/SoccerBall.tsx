import { useSphere } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { SphereCollider } from './Colliders'

function SoccerBall(props) {
  const ballModelRef = useRef()
  const glb = useGLTF('/models/soccer_ball.glb')

  console.log(glb)

//   Object.keys(glb.materials).forEach(function(v){
//     glb.materials[v].metalness = 1;
//     glb.materials[v].roughness = 0.8;
    
// })

  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)

  const [mesh, api] = useSphere(() => ({
    mass: 3,
    type: 'Dynamic',
    args: [0.3],
    onCollideBegin: (e) => {
      if (e.body.name === 'ground1') {
        console.log('바닥과 충돌')
      } else if (e.body.name === 'stair') {
        console.log('계단과 충돌')
      } else {
        console.log('물체와 충돌')
      }
    },
  }))

  useEffect(() => {
    api.position.set(10,0,-10)
  }, [])


  
  useFrame(({ clock }) => {
      const a = clock.getElapsedTime()
      console.log(ballModelRef)
      // console.log("Hey, I'm executing every frame!");
      // console.log(a)
      console.log(mesh)
      console.log(api)
      api.position.subscribe(value => {
          ballModelRef.current.position.setX(value[0])
          ballModelRef.current.position.setY(value[1])
          ballModelRef.current.position.setZ(value[2])
            
      })

      api.rotation.subscribe(value => {
          ballModelRef.current.rotation.set(value[0], value[1], value[2])
      })

    // ballModelRef.current.position.set([mesh.current.position.x, mesh.current.position.y, mesh.current.position.z])
  })

  return (
    <Suspense fallback={null}>
      <primitive
        ref={ballModelRef}
        position={[0,0,1]}
        scale={0.3}
        rotation={props.rotation}
        object={glb.scene}
      />
       <mesh ref={mesh} visible={true}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color='orange' visible={false} />
      </mesh>
    </Suspense>
  )
}

export default SoccerBall
