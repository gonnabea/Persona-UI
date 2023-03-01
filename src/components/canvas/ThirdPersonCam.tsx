import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "three-stdlib";


const ThirdPersonCamera = ({ positionX, positionY, positionZ, rotationZ }) => {
    const { camera, gl } = useThree();
    const [time, setTime] = useState();

    useEffect(() => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 5;
        controls.maxDistance = 5;

        camera.position.set(positionX - 2, positionY + 2, positionZ - 2)
        camera.rotateZ = rotationZ


        camera.lookAt(positionX + 2, positionY, positionZ + 20)
        camera.zoom = 3

        return () => {
            controls.dispose();
        }


    }, [positionX, positionZ]);

    return null;
}

export default ThirdPersonCamera;