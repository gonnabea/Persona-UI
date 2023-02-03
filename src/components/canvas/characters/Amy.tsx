import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { FBXLoader } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Amy(props) {
    const group = useRef();
    // const glb = useGLTF("/models/characters/Amy.fbx");
    const fbx = useLoader(FBXLoader, '/models/characters/Amy.fbx');


    return (
        <Suspense fallback={null}>
            <primitive object={fbx} {...props} />
        </Suspense>
    );
}

export default Amy;