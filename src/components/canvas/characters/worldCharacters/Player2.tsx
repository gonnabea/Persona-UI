// Player2의 캐릭터 모델

import { useFrame, useGraph, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone as SkeletonUtilsClone } from "../../../../utils/SkeletonUtils";
import { GLTF } from 'three-stdlib'
import { useAnimations, useGLTF } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { colyseusRoomState } from "@/recoil/colyseusRoom/atom";

// type ActionName = 'run'

// interface GLTFActions extends THREE.AnimationClip {
//   name: ActionName
// }

// // GLTF Result Type
// type GLTFResult = GLTF & {
//   nodes: {
//     Ch46: THREE.SkinnedMesh
//     mixamorigHips: THREE.Bone
//   }
//   materials: {
//     Ch46_body: THREE.MeshStandardMaterial
//   }
//   animations: GLTFActions[]
// }

const Player2Character = () => {
//   const { scene: amyScene } = useGLTF('/models/characters/AmyClone.glb') as unknown as GLTFResult
  const amyCharacterRef = useRef<THREE.Group>()
  const mutantCharacterRef = useRef<THREE.Group>()
  const louiseCharacterRef = useRef<THREE.Group>()


  const amyGroupRef = useRef<THREE.Group>()
  const mutantGroupRef = useRef<THREE.Group>()
  const louiseGroupRef = useRef<THREE.Group>()


  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)
  const [otherUsers, setOtherUSers] = useState();
  const [show, setShow] = useState(false)
  const [character, setCharacter] = useState('mutant')
  

  const { nodes: amyNodes, materials: amyMaterials, animations: amyAnimations, scene: amyScene } = useGLTF('/models/characters/player2/Amy.glb')
  const { actions: amyActions } = useAnimations(amyAnimations, amyGroupRef)

  const { nodes: mutantNodes, materials: mutantMaterials, animations: mutantAnimations } = useGLTF('/models/characters/player2/Mutant.glb')
  const { actions: mutantActions } = useAnimations(mutantAnimations, mutantGroupRef)

  const { nodes: louiseNodes, materials: louiseMaterials, animations: louiseAnimations } = useGLTF('/models/characters/player2/Louise.glb')
  const { actions: louiseActions } = useAnimations(louiseAnimations, louiseGroupRef)


  amyActions.run?.play()
  mutantActions.run?.play()
  louiseActions.run?.play()




useFrame(() => {

  
      
      if(colyseusRoom) {
        const usersArr = Array.from(colyseusRoom.state.players.$items.values());
        const myColyseusId = colyseusRoom.sessionId;
        const otherUsers = usersArr.filter(player => player.id && player.id !== myColyseusId)
  
     
        otherUsers[0] ? setCharacter(otherUsers[0].character) : null
  
        setOtherUSers(otherUsers)
      }

})

  return (

    <>
    {/* amy */}
    {character === "amy" && otherUsers && otherUsers[0] ? <group ref={amyGroupRef}  scale={0.01}
        position={otherUsers && otherUsers[0] ? [
          otherUsers[0]?.positionX,
          otherUsers[0]?.positionY,
          otherUsers[0]?.positionZ
        ] : 
          null} 
        rotation={otherUsers && otherUsers[0] ? [Math.PI / 2, 0, otherUsers[0]?.rotationZ] : null}
    >
        <group ref={amyCharacterRef}>
          <primitive object={amyNodes.mixamorigHips} />
          <skinnedMesh 
            geometry={amyNodes.Ch46.geometry} 
            material={amyMaterials['Ch46_body.001']} 
            skeleton={amyNodes.Ch46.skeleton} 
          />
        </group>
    </group> : null}

    {/* mutant */}
    { character === 'mutant' && otherUsers && otherUsers[0] ? 
      <group ref={mutantGroupRef}  scale={0.01}
        position={otherUsers && otherUsers[0] ? [
          otherUsers[0]?.positionX,
          otherUsers[0]?.positionY,
          otherUsers[0]?.positionZ
        ] : 
          null} 
        rotation={otherUsers && otherUsers && otherUsers[0] ? [Math.PI / 2, 0, otherUsers[0]?.rotationZ] : null}
    >
        <group ref={mutantCharacterRef}>
          <primitive object={mutantNodes.mixamorigHips} />
       <skinnedMesh
           material={mutantMaterials.mutant_M}
           geometry={mutantNodes.MutantMesh.geometry}
           skeleton={mutantNodes.MutantMesh.skeleton}
         />
        </group>
    </group> : null}

    {/* louise */}

{ character === 'louise' && otherUsers && otherUsers[0] ? 
    <group ref={louiseCharacterRef} dispose={null}>
      <group>
        <group 
    position={otherUsers && otherUsers[0] ? [otherUsers[0]?.positionX, otherUsers[0]?.positionY, otherUsers[0]?.positionZ] : null} 
    rotation={otherUsers && otherUsers[0] ? [Math.PI / 2, 0, otherUsers[0]?.rotationZ] : null} 
        scale={0.01}>
          <primitive object={louiseNodes.mixamorig8Hips} />
  
          {/* <skinnedMesh geometry={nodes.Ch07_Body.geometry} material={materials.Ch07_body} skeleton={nodes.Ch07_Body.skeleton} /> */}

          <skinnedMesh
            name='Ch07_Body'
            geometry={louiseNodes.Ch07_Body.geometry}
            material={louiseMaterials.Ch07_body}
            skeleton={louiseNodes.Ch07_Body.skeleton}
          />
          <skinnedMesh
            name='Ch07_Eyelashes'
            geometry={louiseNodes.Ch07_Eyelashes.geometry}
            material={louiseMaterials.Ch07_hair}
            skeleton={louiseNodes.Ch07_Eyelashes.skeleton}
          />
          <skinnedMesh
            name='Ch07_Hair'
            geometry={louiseNodes.Ch07_Hair.geometry}
            material={louiseMaterials.Ch07_hair}
            skeleton={louiseNodes.Ch07_Hair.skeleton}
          />
          <skinnedMesh
            name='Ch07_Heels'
            geometry={louiseNodes.Ch07_Heels.geometry}
            material={louiseMaterials.Ch07_body}
            skeleton={louiseNodes.Ch07_Heels.skeleton}
          />
          <skinnedMesh
            name='Ch07_Pants'
            geometry={louiseNodes.Ch07_Pants.geometry}
            material={louiseMaterials.Ch07_body}
            skeleton={louiseNodes.Ch07_Pants.skeleton}
          />
          <skinnedMesh
            name='Ch07_Shirt'
            geometry={louiseNodes.Ch07_Shirt.geometry}
            material={louiseMaterials.Ch07_body}
            skeleton={louiseNodes.Ch07_Shirt.skeleton}
          />
          <skinnedMesh
            name='Ch07_Suit'
            geometry={louiseNodes.Ch07_Suit.geometry}
            material={louiseMaterials.Ch07_body}
            skeleton={louiseNodes.Ch07_Suit.skeleton}
          />
        </group>
      </group>
    </group> : null}
    
    </>
    )
  
}

export default Player2Character