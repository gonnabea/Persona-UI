import { itemsState } from '@/recoil/items/atom';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useRecoilState } from 'recoil';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Door1() {
    const group = useRef();
    const glb = useGLTF("/models/exterior_items/door_1.glb");

    const [items, setItems] = useRecoilState(itemsState);

    const door1State = items.door_1


    return (
        door1State.installed === true ? <Suspense fallback={null}>
            <primitive position={door1State.position} rotation={door1State.rotation} object={glb.scene} />
        </Suspense> : null
    );
}

export default Door1;