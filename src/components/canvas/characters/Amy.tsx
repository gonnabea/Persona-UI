import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import ThirdPersonCamera from '../ThirdPersonCam'
import useCharacterControl from '@/hooks/useCharacterControl'
import { Vector3 } from 'three'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

// GLTF Actions Type
type ActionName = 'run'
interface GLTFActions extends THREE.AnimationClip {
  name: ActionName
}

// GLTF Result Type
type GLTFResult = GLTF & {
  nodes: {
    Ch46: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Ch46_body: THREE.MeshStandardMaterial
  }
  animations: GLTFActions[]
}

function Amy(props: JSX.IntrinsicElements['group']) {
  const characterRef = useRef<THREE.Group>()
  const groupRef = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/models/characters/Amy.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)

  // 캐릭터 이동 구현
  const { forward, backward, left, right, jump } = useCharacterControl()

  const [positionX, setPositionX] = useState(-0.3)
  const [positionY, setPositionY] = useState(0.75)
  const [positionZ, setPositionZ] = useState(5)
  const [rotationZ, setRotationZ] = useState([0, 0, 0])

  const frontVector = new Vector3(0, 0, 0)
  const sideVector = new Vector3(0, 0, 0)
  const direction = new Vector3(0, 0, 0)

  let MOVESPEED = 30

  const [mesh, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [0.2],

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

  useFrame(() => {
    actions.run.play()

    frontVector.set(0, 0, Number(forward) - Number(backward))
    sideVector.set(Number(right) - Number(left), 0, 0)

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED)

    api.velocity.set(direction.x, 0, direction.z)

    mesh.current.getWorldPosition(characterRef.current.position)

    characterRef.current.rotation.z < 1.7 ? (characterRef.current.rotation.z += Number(right) / 5) : null
    characterRef.current.rotation.z > -1.7 ? (characterRef.current.rotation.z -= Number(left) / 5) : null
    characterRef.current.rotation.z > -3.4 ? (characterRef.current.rotation.z -= Number(backward) / 5) : null
    characterRef.current.rotation.z < 0 ? (characterRef.current.rotation.z += Number(forward) / 5) : null

    setPositionX(characterRef.current.position.x)
    setPositionY(characterRef.current.position.y)
    setPositionZ(characterRef.current.position.z)

    // setCharacterRotateZ(characterRef.current.rotation.z)
  })

  useEffect(() => {}, [])

  return (
    <group ref={groupRef} {...props}>
      <group
        ref={characterRef}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-0.3, 6, 5]}
        scale={0.1}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}>
        <ThirdPersonCamera
          positionX={positionX / 20}
          positionY={positionY / 20}
          positionZ={positionZ / 20}
          rotationZ={rotationZ}
        />
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh geometry={nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} />
      </group>
    </group>
  )
}

export default Amy
