import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

// interface props {
//     position: [x: number, y: number, z: number],
//     visible: boolean;
// }

const Indicator = ({position, visible}) => {

    const meshRef = useRef(null);

    useFrame((state, delta) => {
      if(meshRef.current)
        meshRef.current.rotation.y += 0.01
    })

    function eulerToDegree(euler) {
        return ( (euler) / (2 * Math.PI) ) * 360
    }

    useEffect(() => {

    }, [position, visible])
    
    return (
      <mesh ref={meshRef} scale={0.5} position={position} visible={visible} rotation={[3.14,0,0]} >
        <coneBufferGeometry args={[1, 2, 10]} />
        <meshStandardMaterial color={"yellowgreen"} />
      </mesh>
    );
  };

export default Indicator;