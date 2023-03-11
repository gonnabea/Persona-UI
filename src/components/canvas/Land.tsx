import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Amy from './characters/Amy';


function Land(props) {
    const group = useRef();
    const glb = useGLTF("/models/the_pure_land.glb");

    const raycaster = useThree((state) => state.raycaster);
    const scene = useThree((state) => state.scene);



    const findPosition = (e) => {

        // 마우스 클릭한 지점 위치 얻기
        const clickedPosition = raycaster.intersectObjects(scene.children)[0]?.point;

        console.log(clickedPosition);

        //   console.log(clickedPosition)
    };

    useFrame(({ clock}) => {
        const a = clock.getElapsedTime()
        // console.log("Hey, I'm executing every frame!");
        // console.log(a)
    })


    return (
      
        <Suspense fallback={null}>
            <primitive onClick={(e) => findPosition(e)} position={props.position} scale={0.1} rotation={props.rotation} object={glb.scene} />
        </Suspense>
    );
}

export default Land;