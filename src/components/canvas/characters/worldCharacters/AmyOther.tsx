// 타 유저의 캐릭터 모델 (Amy)

import { useFrame, useGraph, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone as SkeletonUtilsClone } from "../../../../utils/SkeletonUtils";
import { GLTF } from 'three-stdlib'
import { useAnimations, useGLTF } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { colyseusRoomState } from "@/recoil/colyseusRoom/atom";

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

const AmyOther = () => {
//   const { scene: amyScene } = useGLTF('/models/characters/AmyClone.glb') as unknown as GLTFResult
  const characterRef = useRef<THREE.Group>()
  const groupRef = useRef<THREE.Group>()
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)
  const [otherUsers, setOtherUSers] = useState();
  

  const { nodes, materials, animations, scene: amyScene } = useGLTF('/models/characters/AmyClone.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)

  actions.run?.play()


useFrame(() => {
      const usersArr = Array.from(colyseusRoom.state.players.$items.values());
      
      const myColyseusId = colyseusRoom.sessionId;
      const otherUsers = usersArr.filter(player => player.id && player.id !== myColyseusId)

      setOtherUSers(otherUsers)

})

  return (

    <>
   
    <group ref={groupRef} scale={0.02} 
        position={otherUsers && otherUsers[1] ? [
          otherUsers[1]?.positionX,
          otherUsers[1]?.positionY,
          otherUsers[1]?.positionZ
        ] : 
          null} 
        rotation={otherUsers && otherUsers[1] ? [Math.PI / 2, 0, otherUsers[1]?.rotationZ] : null}
    >
        <group ref={characterRef}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh 
            geometry={nodes.Ch46.geometry} 
            material={materials.Ch46_body} 
            skeleton={nodes.Ch46.skeleton} 
          />
        </group>
    </group>
    
    </>
    )
  
}

export default AmyOther