import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function CastelModel(props) {
    const group = useRef();
    const glb = useGLTF("/models/castle_on_hills.glb");


    return (
        <Suspense fallback={null}>
            <primitive object={glb.scene} />
        </Suspense>
    );
}

export default CastelModel;