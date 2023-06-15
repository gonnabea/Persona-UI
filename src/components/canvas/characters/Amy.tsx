import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type ActionName = 'idle' | 'run_Armature' | 'run' | 'walk'
interface GLTFActions extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Ch46: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    ['Ch46_body.001']: THREE.MeshStandardMaterial
  }
  animations: GLTFActions[]
}

const Amy = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(`/models/characters/Amy.glb`) as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)

  useEffect(() => {
    actions['idle'].play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature' rotation={[Math.PI / 2, 0, 0]} scale={0.045}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name='Ch46'
            geometry={nodes.Ch46.geometry}
            material={materials['Ch46_body.001']}
            skeleton={nodes.Ch46.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/characters/Amy.glb')

export default Amy
