import { itemsState } from '@/recoil/items/atom';
import { landClickIndexState } from '@/recoil/landClickIndex/atom';
import { landClickPosState } from '@/recoil/landClickPos/atom';
import { selectedItemState } from '@/recoil/selectedItem/atom';
import { useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Bed1() {
    const group = useRef();
    const glb = useGLTF("/models/interior_items/bed_1.glb");

    const [items, setItems] = useRecoilState(itemsState);
    const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
    const [installingPos, setInstallingPos] = useState([0,0,0]);

    const raycaster = useThree((state) => state.raycaster)
    const scene = useThree((state) => state.scene)


    // 마우스 무브 위치 얻기
      const findMousePosition = (e) => {
            // console.log(e)

            e.stopPropagation()

            if(raycaster.intersectObjects(scene.children)[0] && items.bed_1.installed === false && items.bed_1.installing === true) {
                
                // const wall = raycaster.intersectObjects(scene.children).find(target => target.object.modelInfo?.name === "wall");
                const groundTarget = raycaster.intersectObjects(scene.children).find(target => target.object.name === 'ground1')
                // console.log(wall)

            if(groundTarget) {

                    const mousePosition = groundTarget.point

                    // if(items.bed_1.installing === true) 
                
                        setInstallingPos([mousePosition.x, mousePosition.y + 4, mousePosition.z]);
                
                    // setLandClickPos(clickedPosition)
            }
        }

    //   console.log(clickedPosition)
  }

      // 마우스 클릭한 위치 얻기
      const findClickedPosition = (e) => {
            // console.log(e)
           
            e.stopPropagation()

            if(raycaster.intersectObjects(scene.children)[0]) {
            
            const groundTarget = raycaster.intersectObjects(scene.children).find(target => target.object.name === 'ground1')

            if(groundTarget) {
                const mousePosition = groundTarget.point

        

                if(items.bed_1.installed === false && items.bed_1.installing === true) {
                  

                   items.bed_1.position = [mousePosition.x, mousePosition.y + 4, mousePosition.z]
                   
                   items.bed_1.installed = true
                   items.bed_1.installing = false

                    glb.scene.children[0].children[0].children[0].children[0].children.forEach(mesh => {
                        mesh.material.opacity = 1;
                    })
                  
                 

                   removeEventListeners()

                }
                
                //    setSelectedItem(null)

                
      }
    }


  }

  const removeEventListeners = () => {
    window.removeEventListener("click", findClickedPosition);
    window.removeEventListener("mousemove", findMousePosition)
  }
  


  useEffect(() => {
    window.addEventListener("mousemove", (e) => findMousePosition(e));

    window.addEventListener("click", (e) => findClickedPosition(e));

    return () => {
        removeEventListeners()
    }
  }, [])


    

    useEffect(() => {
        console.log(items.bed_1)
        console.log(glb.scene)
        if(items.bed_1.installing === true) {
            setSelectedItem(glb.scene)
        }
    }, [items.bed_1])

    useEffect(() => {
        if(items.bed_1.installing === true) {
 
            glb.scene.children[0].children[0].children[0].children[0].children.forEach(mesh => {
                // console.log(material)
                mesh.material.opacity = 0.5;
                mesh.material.transparent = true
            })
        }
        else {
            glb.scene.children[0].children[0].children[0].children[0].children.forEach(mesh => {
                mesh.material.opacity = 1;
                
            })

        }
    }, [items.bed_1.installing])


    return (
        
        items.bed_1.installing === true || items.bed_1.installed === true ? <Suspense fallback={null}>
            <primitive 
              
                onClick={(e) => {
                    // setSelectedItem((e.eventObject))
                    findClickedPosition(e)
                }} 

                onDoubleClick={(e) => {
                    setSelectedItem((e.eventObject))
                }}

                    onPointerOver={() => {
                        document.body.style.cursor = 'pointer'
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = 'default'
                    }}

               
        scale={[1, 1, 1]}
        position={items.bed_1.installing === true ? installingPos : items.bed_1.position} rotation={items.bed_1.rotation} object={glb.scene} />
        </Suspense> : null
    );
}

export default Bed1;