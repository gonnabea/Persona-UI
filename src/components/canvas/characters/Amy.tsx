import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { FBXLoader } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import THREE from 'three';

function Amy(props) {
    const group = useRef();
    // const glb = useGLTF("/models/characters/Amy.fbx");
    const { nodes, materials, animations } = useGLTF('/models/characters/Amy.glb');
    const { actions } = useAnimations(animations, group);

    console.log(nodes, materials, animations)

    useFrame(() => {
        actions.run?.play();
    })





    return (
        <group ref={group} {...props}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh geometry={nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} />
            </group>
        </group>
    );
}

export default Amy;