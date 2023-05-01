import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useGraph, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import ThirdPersonCamera from '../ThirdPersonCam'
import useCharacterControl from '@/hooks/useCharacterControl'
import { Vector3 } from 'three'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useRecoilState } from 'recoil'
import { colyseusPlayersState } from '@/recoil/colyseusPlayers/atom'
import { clone as SkeletonUtilsClone } from "../../../utils/SkeletonUtils";

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

interface propTypes {
  positionX?: number
  positionY?: number
  positionZ?: number
  rotationZ?: number
  isMyCharacter: boolean
}

function Amy(props: propTypes) {
  const characterRef = useRef<THREE.Group>()
  const groupRef = useRef<THREE.Group>()
  const { nodes, materials, animations, scene: amyScene } = useGLTF('/models/characters/Amy.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)
  const {scene} = useThree()
  
  const cloned = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
  const { nodes: clonedNodes } = useGraph(cloned)
  const { actions: clonedActions } = useAnimations(animations ,groupRef)

  // 캐릭터 이동 구현
  const { forward, backward, left, right, jump } = useCharacterControl()
  actions.run?.play()
  const [positionX, setPositionX] = useState(-0.3)
  const [positionY, setPositionY] = useState(0.75)
  const [positionZ, setPositionZ] = useState(5)
  const [rotationZ, setRotationZ] = useState(0)

  const [colyseusRoom, setColyseusRoom] = useRecoilState(colyseusRoomState)
  const [colyseusPlayers, setColyseusPlayers] = useRecoilState(colyseusPlayersState);


  const frontVector = new Vector3(0, 0, 0)
  const sideVector = new Vector3(0, 0, 0)
  const direction = new Vector3(0, 0, 0)

  let MOVESPEED = 3

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
    if(props.isMyCharacter === true) {
      frontVector.set(0, 0, Number(forward) - Number(backward))
      sideVector.set(Number(right) - Number(left), 0, 0)
  
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED)
      characterRef.current.rotation.z < 1.7 ? (characterRef.current.rotation.z += Number(right) / 5) : null
      characterRef.current.rotation.z > -1.7 ? (characterRef.current.rotation.z -= Number(left) / 5) : null
      characterRef.current.rotation.z > -3.4 ? (characterRef.current.rotation.z -= Number(backward) / 5) : null
      characterRef.current.rotation.z < 0 ? (characterRef.current.rotation.z += Number(forward) / 5) : null
  
      api.velocity.set(direction.x, 0, direction.z)
  
      mesh.current.getWorldPosition(characterRef.current.position)
  
      setPositionX(characterRef.current.position.x)
      setPositionY(characterRef.current.position.y)
      setPositionZ(characterRef.current.position.z)
      setRotationZ(characterRef.current.rotation.z)
      // console.log(colyseusRoom)
      const me = JSON.parse(localStorage.getItem("me"));
      colyseusRoom?.send("move", {
        user: {
          email: me.email,
          username: me.username,
        },
        positionX,
        positionY,
        positionZ,
        rotationZ 
      })
    }
    else {
      // 타인 캐릭터일 경우
      setPositionX(props.positionX);
      setPositionY(props.positionY);
      setPositionZ(props.positionZ);
      setRotationZ(props.rotationZ);
      // console.log(clonedNodes)
    }

    
    
    
  })

  return props.isMyCharacter ? (
    <>
      
      
      <group ref={groupRef} dispose={null}>
        <group
          ref={characterRef}
       
          scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
          }}>
          <ThirdPersonCamera positionX={positionX} positionY={positionY} positionZ={positionZ} rotationZ={rotationZ} />
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh geometry={nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} />
        </group>
      </group>
        {/* @ts-ignore */}
      <mesh ref={mesh} visible={true}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color='orange' />
      </mesh>
      
      
    </>
  ) : 
    // console.log(clonedNodes)
  <group ref={groupRef} dispose={null}>
      <group
          ref={characterRef}
        scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, rotationZ]} position={[positionX, positionY, positionZ]}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
          }}>
          <primitive object={clonedNodes.Scene} />
          <skinnedMesh geometry={clonedNodes.Ch46.geometry} material={materials.Ch46_body} skeleton={clonedNodes.Ch46.skeleton} />
        </group>
      </group>
}

export default Amy
