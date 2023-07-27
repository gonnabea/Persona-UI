import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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

const Mutant = (props: JSX.IntrinsicElements['group']) => {
  const groupRef = useRef<THREE.Group>(null)
  const characterRef = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/models/characters/Mutant.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)

  console.log(nodes)
  console.log(materials)

  useEffect(() => {
    console.log(actions)
    actions['Armature|mixamo.com|Layer0'].play()
  }, [actions])

  return (
    <group ref={groupRef} dispose={null} {...props}>
      <group ref={characterRef} rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          material={materials['mutant_M.001']}
          geometry={nodes.MutantMesh001.geometry}
          skeleton={nodes.MutantMesh001.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/characters/Mutant.glb')

export default Mutant
