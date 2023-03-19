import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type ActionName = 'Armature|mixamo.com|Layer0'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    Bottoms: THREE.SkinnedMesh
    Eyelashes: THREE.SkinnedMesh
    Eyes: THREE.SkinnedMesh
    Hair: THREE.SkinnedMesh
    Shoes: THREE.SkinnedMesh
    Tops: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Bodymat: THREE.MeshStandardMaterial
    Bottommat: THREE.MeshStandardMaterial
    Eyelashmat: THREE.MeshStandardMaterial
    Hairmat: THREE.MeshStandardMaterial
    Shoesmat: THREE.MeshStandardMaterial
    Topmat: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

const Remy = (props: JSX.IntrinsicElements['group']) => {
  const groupRef = useRef<THREE.Group>(null)
  const characterRef = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/models/characters/Remy.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFAction>(animations, groupRef)

  useEffect(() => {
    actions['Armature|mixamo.com|Layer0'].play()
  }, [actions])

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name='Armature' rotation={[Math.PI / 2, 0, 0]} scale={0.015}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          name='Body'
          geometry={nodes.Body.geometry}
          material={materials.Bodymat}
          skeleton={nodes.Body.skeleton}
        />
        <skinnedMesh
          name='Bottoms'
          geometry={nodes.Bottoms.geometry}
          material={materials.Bottommat}
          skeleton={nodes.Bottoms.skeleton}
        />
        <skinnedMesh
          name='Eyelashes'
          geometry={nodes.Eyelashes.geometry}
          material={materials.Eyelashmat}
          skeleton={nodes.Eyelashes.skeleton}
        />
        <skinnedMesh
          name='Eyes'
          geometry={nodes.Eyes.geometry}
          material={materials.Bodymat}
          skeleton={nodes.Eyes.skeleton}
        />
        <skinnedMesh
          name='Hair'
          geometry={nodes.Hair.geometry}
          material={materials.Hairmat}
          skeleton={nodes.Hair.skeleton}
        />
        <skinnedMesh
          name='Shoes'
          geometry={nodes.Shoes.geometry}
          material={materials.Shoesmat}
          skeleton={nodes.Shoes.skeleton}
        />
        <skinnedMesh
          name='Tops'
          geometry={nodes.Tops.geometry}
          material={materials.Topmat}
          skeleton={nodes.Tops.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/characters/Remy.glb')

export default Remy
