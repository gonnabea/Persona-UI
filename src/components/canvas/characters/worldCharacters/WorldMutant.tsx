import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'
import { useRecoilState } from 'recoil'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { Vector3 } from 'three'
import useCharacterControl from '@/hooks/useCharacterControl'
import { useSphere } from '@react-three/cannon'
import ThirdPersonCamera from '../../ThirdPersonCam'


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
  const groupRef = useRef<THREE.Group>()
  const characterRef = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/models/characters/Mutant.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, groupRef)
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)
  const [isMyCharacter, setIsMyCharacter] = useState(false)

  const [otherUsers, setOtherUSers] = useState();

  const { forward, backward, left, right, jump } = useCharacterControl()
  const [positionX, setPositionX] = useState(-0.3)
  const [positionY, setPositionY] = useState(0.75)
  const [positionZ, setPositionZ] = useState(5)
  const [rotationZ, setRotationZ] = useState(0)

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

    const setAnimationStatus = () => {
    if (forward || backward || left || right) {
      actions['run']?.play(); 
      actions['idle']?.stop();
    }
    else {
      actions['idle']?.play();
      actions['run']?.stop();
    }
  }

    


  useEffect(() => {
    actions['Armature|mixamo.com|Layer0'].play()
  }, [actions])

  useEffect(() => {
      
      const usersArr = Array.from(colyseusRoom.state.players.$items.values());
      const myColyseusId = colyseusRoom.sessionId;

      const existUsers = usersArr.filter(player => player.id !== undefined);
      const colyseusRoomOwner = existUsers[0]
     
      const otherUsers = usersArr.filter(player => player.id && player.id !== myColyseusId)

      if(colyseusRoomOwner && colyseusRoomOwner.id !== myColyseusId) {
        setIsMyCharacter(true);
      }

      setOtherUSers(otherUsers)

  }, [])

    useFrame(() => {

    setAnimationStatus()

    if (isMyCharacter === true) {
      console.log("Mutant: !!isMyCharacter!!")
      // console.log(forward, backward, left, right)
      frontVector.set(0, 0, Number(forward) - Number(backward))
      sideVector.set(Number(right) - Number(left), 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED)
      characterRef.current.rotation.z < 1.7 ? (characterRef.current.rotation.z += Number(right) / 5) : null
      characterRef.current.rotation.z > -1.7 ? (characterRef.current.rotation.z -= Number(left) / 5) : null
      characterRef.current.rotation.z > -3.4 ? (characterRef.current.rotation.z -= Number(backward) / 5) : null
      characterRef.current.rotation.z < 0 ? (characterRef.current.rotation.z += Number(forward) / 5) : null
      console.log(direction)
      console.log(api)
      api.velocity.set(direction.x, 0, direction.z)
      mesh.current.getWorldPosition(characterRef.current.position)
      setPositionX(characterRef.current.position.x)
      setPositionY(characterRef.current.position.y)
      setPositionZ(characterRef.current.position.z)
      setRotationZ(characterRef.current.rotation.z)
      
      const me = JSON.parse(localStorage.getItem("me"));
      if (forward || backward || left || right) {
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
    }
    else {

      // 타인 캐릭터일 경우
      if(otherUsers && otherUsers[0]) {

        const positionX = otherUsers[0].positionX
        const positionY = otherUsers[0].positionY
        const positionZ = otherUsers[0].positionZ
        const rotationZ = otherUsers[0].rotationZ

        setPositionX(positionX);
        setPositionY(positionY);
        setPositionZ(positionZ);
        setRotationZ(rotationZ);
      }
      
    }

      
  })

  return isMyCharacter ? <>
    <group ref={groupRef} dispose={null} >
      <group 
      ref={characterRef} 
        position={[Math.PI / 2, 0, 0]} 
        rotation= {[Math.PI / 2, 0, rotationZ]}
        scale={0.020}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          material={materials.mutant_M}
          geometry={nodes.MutantMesh.geometry}
          skeleton={nodes.MutantMesh.skeleton}
        />
        
        
        {console.log('Mutant: is my character!!!')}
        <ThirdPersonCamera
            positionX={positionX} 
            positionY={positionY} 
            positionZ={positionZ} 
            rotationZ={rotationZ}
          />
        
      </group>
    </group>
             {/* @ts-ignore */}
      <mesh ref={mesh} visible={true}>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color='orange' />
      </mesh>
      </>
   : <group ref={groupRef} dispose={null} >
      <group ref={characterRef} 
        position={[positionX, positionY, positionZ]} 
        rotation= {[Math.PI / 2, 0, rotationZ]}
        scale={0.020}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          material={materials.mutant_M}
          geometry={nodes.MutantMesh.geometry}
          skeleton={nodes.MutantMesh.skeleton}
        />
        
        
       
      </group>
    </group>
}


export default WorldMutant
