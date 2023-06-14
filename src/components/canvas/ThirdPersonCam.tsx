import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "three-stdlib";


const ThirdPersonCamera = ({ positionX, positionY, positionZ, rotationZ }) => {
    const { camera, gl } = useThree();
    const [time, setTime] = useState();

    
    useEffect(() => {
        const controls = new OrbitControls(camera, gl.domElement);
        
        controls.enabled = true
        controls.enableRotate = true
        controls.enablePan = true
        controls.minDistance = 5;
        controls.maxDistance = 5;
        // controls.rotateSpeed = 2;
        // controls.autoRotate = true
        
        camera.position.set(positionX - 3, positionY + 3, positionZ - 3)
        // camera.rotateZ = rotationZ


        camera.lookAt(positionX + 3, positionY, positionZ + 3)
        // camera.zoom = 3

        return () => {
            controls.dispose();
        }


    }, [positionX, positionZ]);

    useFrame(() => {
        // controls.update()
    })

    return null;
}

export default ThirdPersonCamera;