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

const AmyOthers = () => {
//   const { scene: amyScene } = useGLTF('/models/characters/AmyClone.glb') as unknown as GLTFResult
  const characterRef = useRef<THREE.Group>()
  const groupRef = useRef<THREE.Group>()
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)
  const [otherUsers, setOtherUSers] = useState();
  

  const { nodes, materials, animations, scene: amyScene } = useGLTF('/models/characters/AmyClone.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)

  actions.run?.play()
//   const {scene} = useThree(state => state.scene)
    // const nodes = useGraph(amyScene)
    // gltf.scene.castShadow = true;
    // const raycaster = useThree((state) => state.raycaster);
    // const scene = useThree((state) => state.scene)

    // const cloned = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
    // const cloned2 = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
    // const cloned3 = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
    // const cloned4 = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
    // const cloned5 = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
    // const cloned6 = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])
    // const cloned7 = useMemo(() => SkeletonUtilsClone(amyScene), [amyScene])

//   const clonedArr = [
//       cloned,
//       cloned2,
//       cloned3,
//       cloned4,
//       cloned5,
//       cloned6,
//       cloned7,
//   ]

useFrame(() => {
      const usersArr = Array.from(colyseusRoom.state.players.$items.values());
      const me = JSON.parse(localStorage.getItem("me"))

      const otherUsers = usersArr.filter(player => player.id && player.id !== me.colyseusSessionId)
      // console.log(usersArr)
      // console.log(otherUsers)
      setOtherUSers(otherUsers)
})

  return (
    // clonedArr.map(clonedAmy => <>
    //         <primitive object={clonedAmy} scale={0.1} />
    //         </>
    //     )
    <>
    {/* {console.log(cloned)} */}
    {/* {console.log(colyseusRoom)}
    {console.log(nodes)} */}
    <group ref={groupRef} scale={0.02} 
    position={otherUsers && otherUsers[0] ? [otherUsers[0]?.positionX, otherUsers[0]?.positionY, otherUsers[0]?.positionZ] : null} 
    rotation={otherUsers && otherUsers[0] ? [Math.PI / 2, 0, otherUsers[0]?.rotationZ] : null}
    >
        <group ref={characterRef}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh 
            geometry={nodes.Ch46.geometry} 
            material={materials.Ch46_body} 
            skeleton={nodes.Ch46.skeleton} 
          />

    {/* <skinnedMesh  geometry={cloned.children[0].children[0].geometry} material={cloned.children[0].children[0].material} skeleton={cloned.children[0].children[0].skeleton} /> */}

        </group>
    </group>
    
    </>
    )
  
}

export default AmyOthers