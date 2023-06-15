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
}

export function MyCharacter(props: propTypes) {

  const amyCharacterRef = useRef<THREE.Group>()
  const mutantCharacterRef = useRef<THREE.Group>()
  const louiseCharacterRef = useRef<THREE.Group>()

    const amyGroupRef = useRef<THREE.Group>()
  const mutantGroupRef = useRef<THREE.Group>()
  const louiseGroupRef = useRef<THREE.Group>()

  const [character, setCharacter] = useState('mutant')



  // const { nodes: amyNodes, materials: amyMaterials, animations: amyAnimations, scene: amyScene } = useGLTF(`${process.env.NEXT_PUBLIC_API_URL}/file/downloadCharacters?fileName=player1/Amy.glb`)
  const { nodes: amyNodes, materials: amyMaterials, animations: amyAnimations, scene: amyScene } = useGLTF(`${process.env.NEXT_PUBLIC_API_URL}/models/characters/player1/Amy.glb`)

  const { actions: amyActions } = useAnimations(amyAnimations, amyGroupRef)

  const { nodes: mutantNodes, materials: mutantMaterials, animations: mutantAnimations } = useGLTF(`${process.env.NEXT_PUBLIC_API_URL}/models/characters/player1/Mutant.glb`)
  const { actions: mutantActions } = useAnimations(mutantAnimations, mutantGroupRef)

  const { nodes: louiseNodes, materials: louiseMaterials, animations: louiseAnimations } = useGLTF(`${process.env.NEXT_PUBLIC_API_URL}/models/characters/player1/Louise.glb`)
  const { actions: louiseActions } = useAnimations(louiseAnimations, louiseGroupRef)

  const { scene } = useThree()

  // 캐릭터 이동 구현
  const { forward, backward, left, right, jump } = useCharacterControl()
  const [positionX, setPositionX] = useState(-0.3)
  const [positionY, setPositionY] = useState(0.75)
  const [positionZ, setPositionZ] = useState(5)
  const [rotationZ, setRotationZ] = useState(0)
  const [colyseusRoom, setColyseusRoom] = useRecoilState(colyseusRoomState)
  const [updateIndex, forceUpdate] = useState(0)


  const frontVector = new Vector3(0, 0, 0)
  const sideVector = new Vector3(0, 0, 0)
  const direction = new Vector3(0, 0, 0)
  let MOVESPEED = 6

  const [mesh, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [0.4],
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

  useEffect(() => {
    // materials['Ch46_body.001'].metalness = 0.5;
    // materials['Ch46_body.001'].roughness = 0.1;
    const me = JSON.parse(localStorage.getItem("me"));

    setCharacter(me?.character)
     


  }, [])




  const setAmyAnimationStatus = () => {

  

    if (forward || backward || left || right) {
      amyActions['run']?.play(); 
      amyActions['idle']?.stop();
    }
    else {
      amyActions['idle']?.play();
      amyActions['run']?.stop();
    }
  }

    const setMutantAnimationStatus = () => {
      // console.log(mutantActions)

    if (forward || backward || left || right) {
      mutantActions['run_Armature.001_Armature']?.play(); 
      mutantActions['Armature|mixamo.com|Layer0']?.stop();
    }
    else {
      mutantActions['Armature|mixamo.com|Layer0']?.play();
      mutantActions['run_Armature.001_Armature']?.stop();
    }
  }

    const setLouiseAnimationStatus = () => {
      // console.log(louiseActions)
    if (forward || backward || left || right) {
      louiseActions['run']?.play(); 
      // louiseActions['Armature|mixamo.com|Layer0.001']?.stop();
    }
    else {
      louiseActions['Armature|mixamo.com|Layer0.001']?.play();
      louiseActions['run']?.stop();
    }
  }



  const me = JSON.parse(localStorage.getItem("me"));

  useFrame(() => {
 

      // let characterRef

      // if (characterRef === 'amy')
      //   characterRef = amyCharacterRef;
      // if (characterRef === 'mutant')
      //   characterRef = mutantCharacterRef;
      // if (characterRef === 'louise')
      //   characterRef = louiseCharacterRef;
    
      
      if(character === 'amy') {


        setAmyAnimationStatus()

        frontVector.set(0, 0, Number(forward) - Number(backward))
        sideVector.set(Number(right) - Number(left), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED)
        amyCharacterRef.current.rotation.z < 1.7 ? (amyCharacterRef.current.rotation.z += Number(right) / 5) : null
        amyCharacterRef.current.rotation.z > -1.7 ? (amyCharacterRef.current.rotation.z -= Number(left) / 5) : null
        amyCharacterRef.current.rotation.z > -3.4 ? (amyCharacterRef.current.rotation.z -= Number(backward) / 5) : null
        amyCharacterRef.current.rotation.z < 0 ? (amyCharacterRef.current.rotation.z += Number(forward) / 5) : null
        api.velocity.set(direction.x, 0, direction.z)
        mesh.current.getWorldPosition(amyCharacterRef.current.position)
        setPositionX(amyCharacterRef.current.position.x)
        setPositionY(amyCharacterRef.current.position.y)
        setPositionZ(amyCharacterRef.current.position.z)
        setRotationZ(amyCharacterRef.current.rotation.z)
      }

      if(character === "mutant") {


        setMutantAnimationStatus()
        frontVector.set(0, 0, Number(forward) - Number(backward))
        sideVector.set(Number(right) - Number(left), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED)
        mutantCharacterRef.current.rotation.z < 1.7 ? (mutantCharacterRef.current.rotation.z += Number(right) / 5) : null
        mutantCharacterRef.current.rotation.z > -1.7 ? (mutantCharacterRef.current.rotation.z -= Number(left) / 5) : null
        mutantCharacterRef.current.rotation.z > -3.4 ? (mutantCharacterRef.current.rotation.z -= Number(backward) / 5) : null
        mutantCharacterRef.current.rotation.z < 0 ? (mutantCharacterRef.current.rotation.z += Number(forward) / 5) : null
        api.velocity.set(direction.x, 0, direction.z)
        mesh.current.getWorldPosition(mutantCharacterRef.current.position)
        setPositionX(mutantCharacterRef.current.position.x)
        setPositionY(mutantCharacterRef.current.position.y)
        setPositionZ(mutantCharacterRef.current.position.z)
        setRotationZ(mutantCharacterRef.current.rotation.z)
      }

      if(character === "louise") {


        setLouiseAnimationStatus()
        frontVector.set(0, 0, Number(forward) - Number(backward))
        sideVector.set(Number(right) - Number(left), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED)
        louiseCharacterRef.current.rotation.z < 1.7 ? (louiseCharacterRef.current.rotation.z += Number(right) / 5) : null
        louiseCharacterRef.current.rotation.z > -1.7 ? (louiseCharacterRef.current.rotation.z -= Number(left) / 5) : null
        louiseCharacterRef.current.rotation.z > -3.4 ? (louiseCharacterRef.current.rotation.z -= Number(backward) / 5) : null
        louiseCharacterRef.current.rotation.z < 0 ? (louiseCharacterRef.current.rotation.z += Number(forward) / 5) : null
        api.velocity.set(direction.x, 0, direction.z)
        mesh.current.getWorldPosition(louiseCharacterRef.current.position)
        setPositionX(louiseCharacterRef.current.position.x)
        setPositionY(louiseCharacterRef.current.position.y)
        setPositionZ(louiseCharacterRef.current.position.z)
        setRotationZ(louiseCharacterRef.current.rotation.z)
      }

      
      if (forward || backward || left || right) {
        // console.log("moving")
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

      
    
    
  })

  return (
    <>

     {character === 'amy' ? <group ref={amyGroupRef} dispose={null}>
        <group
          ref={amyCharacterRef}
          scale={[0.01, 0.01, 0.01]} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[-0.3, 6, 5]}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
          }}>
          <ThirdPersonCamera 
            positionX={positionX} 
            positionY={positionY} 
            positionZ={positionZ} 
            rotationZ={rotationZ} 
          />
          <primitive object={amyNodes.mixamorigHips} />
          <skinnedMesh 
            geometry={amyNodes.Ch46.geometry} 
            material={amyMaterials['Ch46_body.001']} 
            skeleton={amyNodes.Ch46.skeleton} 
          />
        </group>
      </group> : null }


      { character === 'mutant' ? <group ref={mutantGroupRef}  
          
    >
        <group
           scale={[0.01, 0.01, 0.01]} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[-0.3, 6, 5]}
        ref={mutantCharacterRef}>
          <ThirdPersonCamera 
            positionX={positionX} 
            positionY={positionY} 
            positionZ={positionZ} 
            rotationZ={rotationZ} 
          />
          <primitive object={mutantNodes.mixamorigHips} />
       <skinnedMesh
           material={mutantMaterials.mutant_M}
           geometry={mutantNodes.MutantMesh.geometry}
           skeleton={mutantNodes.MutantMesh.skeleton}
         />
        </group>
    </group> : null}


     { character === 'louise' ? <group ref={louiseGroupRef} dispose={null}>
      <group ref={louiseCharacterRef}  scale={[0.01, 0.01, 0.01]} 
            rotation={[Math.PI / 2, 0, 0]} 
            position={[-0.3, 6, 5]} name='Scene'>
        <group name='Armature'           
           
          >
          <ThirdPersonCamera 
            positionX={positionX} 
            positionY={positionY} 
            positionZ={positionZ} 
            rotationZ={rotationZ} 
          />
          <primitive object={louiseNodes.mixamorig8Hips} />
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

      
      {/* @ts-ignore */}
    
      <mesh ref={mesh} visible={false}>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color='orange' />
      </mesh>
    </>
  )
}

