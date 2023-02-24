import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { FBXLoader } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import THREE from 'three';
import ThirdPersonCamera from '../ThirdPersonCam';
import useCharacterControl from '@/hooks/useCharacterControl';
import { Vector3 } from 'three';
import { useSphere } from '@react-three/cannon';

function Amy(props) {

    const characterRef = useRef<any>(); // 타입 조사 필요

    // const glb = useGLTF("/models/characters/Amy.fbx");
    const group = useRef();
    const { nodes, materials, animations } = useGLTF('/models/characters/Amy.glb');
    const { actions } = useAnimations(animations, group);

    console.log(nodes, materials, animations);

    // 캐릭터 이동 구현
    const { forward, backward, left, right, jump } = useCharacterControl();

    const [positionX, setPositionX] = useState(-0.3);
    const [positionY, setPositionY] = useState(0.75);
    const [positionZ, setPositionZ] = useState(5);
    const [rotationZ, setRotationZ] = useState([0, 0, 0]);

    const frontVector = new Vector3(0, 0, 0)
    const sideVector = new Vector3(0, 0, 0)
    const direction = new Vector3(0, 0, 0)

    let MOVESPEED = 30

    const [mesh, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        args: [0.2],

        onCollideBegin: (e) => {
            if (e.body.name === "ground1") {
                console.log("바닥과 충돌")
            }
            else if (e.body.name === "stair") {
                console.log("계단과 충돌")
            }
            else {
                console.log("물체와 충돌")
            }
        }

    }))

    useFrame(() => {
        actions.run?.play();

        frontVector.set(0, 0, Number(forward) - Number(backward));
        sideVector.set(Number(right) - Number(left), 0, 0);

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVESPEED);

        api.velocity.set(direction.x, 0, direction.z);

        mesh.current.getWorldPosition(characterRef.current.position);

        characterRef.current.rotation.z < 1.7 ? characterRef.current.rotation.z += Number(right) / 5 : null;
        characterRef.current.rotation.z > -1.7 ? characterRef.current.rotation.z -= Number(left) / 5 : null;
        characterRef.current.rotation.z > -3.4 ? characterRef.current.rotation.z -= Number(backward) / 5 : null;
        characterRef.current.rotation.z < 0 ? characterRef.current.rotation.z += Number(forward) / 5 : null;


        setPositionX(characterRef.current.position.x)
        setPositionY(characterRef.current.position.y)
        setPositionZ(characterRef.current.position.z)

        // setCharacterRotateZ(characterRef.current.rotation.z)

    })


    // ThirdPersonCamera({
    //     positionX: props.position.x,
    //     positionY: props.position.y,
    //     positionZ: props.position.z,
    //     rotationZ: 0
    // })





    return (
        <group ref={group} {...props}>
            <group
                ref={characterRef}
                rotation={[Math.PI / 2, 0, 0]}
                position={[-0.3, 6, 5]}
                scale={0.1}
                onPointerOver={() => {
                    document.body.style.cursor = "pointer"
                }}
                onPointerOut={() => {
                    document.body.style.cursor = "default"
                }}
            >
                <primitive object={nodes.mixamorigHips} />

                <skinnedMesh geometry={
                    // @ts-ignore 
                    nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} />
            </group>
        </group>
    );
}

export default Amy;