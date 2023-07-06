import { enterSoccerIndexState } from '@/recoil/enterSoccer/atom'
import { useGLTF } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { TextureLoader } from 'three'


function SoccerTrophy(props) {
  const group = useRef()
  const gltf = useGLTF('/models/fifa_club_world_cup/scene.gltf')
  const targetObject = useRef()
  const directionalLight = useRef()

  const imgTexture = useLoader(TextureLoader, 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI');

  console.log(gltf)
  // gltf.materials.M_0136_Charcoal.metalness = 1;
  // gltf.materials.M_0136_Charcoal.roughness = 0.5;

  const [enterSoccerIndex, setEnterSoccerIndex] = useRecoilState(enterSoccerIndexState)


//   Object.keys(glb.materials).forEach(function(v){
//     glb.materials[v].metalness = 1;
//     glb.materials[v].roughness = 0.8;
    
  Object.values(gltf.materials).forEach(material => {
    
    material.metalness = 0.5;
    material.roughness = 0.3;
    // material.normalMap = imgTexture


    // material.transparent = true
    // material.opacity = 0.8

   
    
    // material.alphaToCoverage = true



  })



  return (
    <Suspense fallback={null}>
      <primitive
        onClick={(e) => setEnterSoccerIndex(enterSoccerIndex === false ? true : false )}
        onPointerOver={() => (window.document.body.style.cursor = "pointer")}
        onPointerOut={() => (window.document.body.style.cursor = "default")}
        position={[5,-1,-35]}
        scale={10}
        rotation={[0,0,0]}
        object={gltf.scene}
        // visible={false}
      />
      {/* <directionalLight position={[0, 0, 0]} intensity={10} target={targetObject.current} /> */}
    </Suspense>
  )
}

export default SoccerTrophy
