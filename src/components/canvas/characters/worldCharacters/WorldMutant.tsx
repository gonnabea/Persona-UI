import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'
import { useRecoilState } from 'recoil'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'

// GLTF Action Type
type ActionName =
  | 'Armature|mixamo.com|Layer0'
  | 'Armature|mixamo.com|Layer0.001_Armature'
  | 'Armature|mixamo.com|Layer0_Armature'
  | 'run_Armature.001_Armature'
interface GLTFActions extends THREE.AnimationClip {
  name: ActionName
}

// GLTF Result Type
type GLTFResult = GLTF & {
  nodes: {
    MutantMesh: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    mutant_M: THREE.MeshPhysicalMaterial
  }
  animations: GLTFActions[]
}

const WorldMutant = (props: JSX.IntrinsicElements['group']) => {
  const groupRef = useRef<THREE.Group>(null)
  const characterRef = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/models/characters/Mutant.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)

  const [otherUsers, setOtherUSers] = useState();


  useEffect(() => {
    actions['Armature|mixamo.com|Layer0'].play()
  }, [actions])

    useFrame(() => {
      const usersArr = Array.from(colyseusRoom.state.players.$items.values());
      const me = JSON.parse(localStorage.getItem("me"))

      const otherUsers = usersArr.filter(player => player.id && player.id !== me.colyseusSessionId)
      // console.log(usersArr)
      // console.log(otherUsers)
      setOtherUSers(otherUsers)
  })

  return (
    <group ref={groupRef} dispose={null} >
      <group ref={characterRef} 
    position={otherUsers && otherUsers[1] ? [otherUsers[1]?.positionX, otherUsers[1]?.positionY, otherUsers[1]?.positionZ] : null} 
    rotation={otherUsers && otherUsers[1] ? [Math.PI / 2, 0, otherUsers[1]?.rotationZ] : null}
        scale={0.020}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          material={materials.mutant_M}
          geometry={nodes.MutantMesh.geometry}
          skeleton={nodes.MutantMesh.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/characters/Mutant.glb')

export default WorldMutant
