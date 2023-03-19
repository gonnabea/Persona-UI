/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/characters/Louise.glb --types
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type ActionName = 'Armature|mixamo.com|Layer0.001'
interface GLTFActions extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Ch07_Body: THREE.SkinnedMesh
    Ch07_Eyelashes: THREE.SkinnedMesh
    Ch07_Hair: THREE.SkinnedMesh
    Ch07_Heels: THREE.SkinnedMesh
    Ch07_Pants: THREE.SkinnedMesh
    Ch07_Shirt: THREE.SkinnedMesh
    Ch07_Suit: THREE.SkinnedMesh
    mixamorig8Hips: THREE.Bone
  }
  materials: {
    Ch07_body: THREE.MeshStandardMaterial
    Ch07_hair: THREE.MeshStandardMaterial
  }
  animations: GLTFActions[]
}

const Louise = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/models/characters/Louise.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)

  useEffect(() => {
    actions['Armature|mixamo.com|Layer0.001'].play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature' rotation={[Math.PI / 2, 0, 0]} scale={0.035}>
          <primitive object={nodes.mixamorig8Hips} />
          <skinnedMesh
            name='Ch07_Body'
            geometry={nodes.Ch07_Body.geometry}
            material={materials.Ch07_body}
            skeleton={nodes.Ch07_Body.skeleton}
          />
          <skinnedMesh
            name='Ch07_Eyelashes'
            geometry={nodes.Ch07_Eyelashes.geometry}
            material={materials.Ch07_hair}
            skeleton={nodes.Ch07_Eyelashes.skeleton}
          />
          <skinnedMesh
            name='Ch07_Hair'
            geometry={nodes.Ch07_Hair.geometry}
            material={materials.Ch07_hair}
            skeleton={nodes.Ch07_Hair.skeleton}
          />
          <skinnedMesh
            name='Ch07_Heels'
            geometry={nodes.Ch07_Heels.geometry}
            material={materials.Ch07_body}
            skeleton={nodes.Ch07_Heels.skeleton}
          />
          <skinnedMesh
            name='Ch07_Pants'
            geometry={nodes.Ch07_Pants.geometry}
            material={materials.Ch07_body}
            skeleton={nodes.Ch07_Pants.skeleton}
          />
          <skinnedMesh
            name='Ch07_Shirt'
            geometry={nodes.Ch07_Shirt.geometry}
            material={materials.Ch07_body}
            skeleton={nodes.Ch07_Shirt.skeleton}
          />
          <skinnedMesh
            name='Ch07_Suit'
            geometry={nodes.Ch07_Suit.geometry}
            material={materials.Ch07_body}
            skeleton={nodes.Ch07_Suit.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/moldes/characters/Louise.glb')

export default Louise
