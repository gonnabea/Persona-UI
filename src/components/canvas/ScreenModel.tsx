import { enterSoccerIndexState } from '@/recoil/enterSoccer/atom'
import { useGLTF, useTexture, useVideoTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'


function ScreenModel(props) {
  const group = useRef()
  const gltf = useGLTF('/models/tv.glb')
  const videoTextureRef = useRef()
  const videoTexture1 = useVideoTexture("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
  console.log(gltf)
  // gltf.materials.M_0136_Charcoal.metalness = 1;
  // gltf.materials.M_0136_Charcoal.roughness = 0.5;

    //   const [video, setVideo] = useState(() => {
    //   const vid = document.createElement("video");
    //   vid.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    //   vid.crossOrigin = "Anonymous";
    //   vid.loop = true;
    //   vid.play()
    //   return vid;
    //     });


//   Object.keys(glb.materials).forEach(function(v){
//     glb.materials[v].metalness = 1;
//     glb.materials[v].roughness = 0.8;


    
  Object.values(gltf.materials).forEach(material => {

    console.log(material)
    
    material.metalness = 0.5;
    material.roughness = 0.3;

   material.emissiveMap = videoTexture1

  })

  useEffect(() => {
      console.log(gltf)
      setTimeout(() => {
          gltf.scene.children[0].children[0].children[0].children[1].children[0].material.map = videoTexture1;
          console.log(videoTexture1, "color: red;")
          videoTexture1.source.data.play()
        //   video.play()
      }, 0)
    //    video.play()
  }, [])


        return (
            <>
                <primitive 
                    onClick={() => {
                        videoTexture1.source.data.paused ? videoTexture1.source.data.play() : videoTexture1.source.data.pause()
                    }} 
                    
                    position={[30.022834499063098,-2,-20.51774623131295]} scale={[1.5, 1.2 ,1]} 
                    object={gltf.scene} 
                    rotation={[0, 3.8, 0]}
                    onPointerOver={() => {
                        document.body.style.cursor = "pointer"
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = "default"
    
                    }}
                />
                    {/* <mesh  scale={[0,5.8,6]} rotation={[0,3.9,0]} position={[-1,1.7,-0.6]}>
                        <planeBufferGeometry />
                        <meshBasicMaterial>
                            <videoTexture ref={videoTextureRef} attach="map" args={[video]} />
                        </meshBasicMaterial>
                    </mesh> */}
            </>
        )
}

export default ScreenModel

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { useLoader, useThree } from '@react-three/fiber';
// import { modelList } from '../../../data/modelList';
// import { useEffect, useRef, useState } from 'react';
// import { useAspect } from "@react-three/drei";
// import { Vector3 } from 'three';
// import { addModel, applyModels, setModels } from '../../../stores/ThreeModels';
// import { RerenderType } from '../../../types/common';
// import { ThreeModelOpts, modelNameTypes } from '../../../types/threeModelTypes';
// import { useReactiveVar } from '@apollo/client';
// import { applyThreeModels, setAllModelsStatus } from '../../../stores/setAllThreeModels';


// interface tvModelOpts extends ThreeModelOpts {
//     videoUrl?: string;

// }

// const TvModel = ({rerender, setRerender,}: RerenderType) => {

//     const allModelsStatus = useReactiveVar(applyThreeModels);
//     const { installed, scale, rotateY, isFocused, position, videoUrl } = allModelsStatus.tv[0]


//     const createModelStatus = async () => {
//         const modelStatus = {
//           name: "tv",
//           position,
//           installed,
//           scale: {x: scale, y: scale, z: scale},
//           rotateY
//         }
//         addModel(modelStatus)
//       }

//     const size = useAspect(18 * scale, 10 * scale);
    // const [video, setVideo] = useState(() => {
    //   const vid = document.createElement("video");
    //   vid.src = videoUrl;
    //   vid.crossOrigin = "Anonymous";
    //   vid.loop = true;
    //   return vid;
    // });


//     const gltf = useLoader(GLTFLoader, modelList.tv);

//     const raycaster = useThree((state) => state.raycaster);
//     const scene = useThree((state) => state.scene)



//     const installModel = (e) => {
        
//             // 마우스 클릭한 지점 위치 얻기
//             const closedObjPosition = raycaster.intersectObjects(scene.children)[0]?.point
//             console.dir(e.target.tagName)
//             // 모델 설치
//             if(closedObjPosition && isFocused === true && e.target.tagName === "CANVAS"){
//                   console.log("tv 포커싱 상태");
//                 //   setModelStatus({
//                 //     ...modelStatus,
//                 //     position: {x: closedObjPosition.x, y: 0.4, z: closedObjPosition.z}
//                 // });

//                 setAllModelsStatus({
//                     modelName: modelNameTypes.tv2,
//                     index: 0,
//                     status: {
//                         installed,
//                         scale,
//                         rotateY,
//                         isFocused,
//                         position: {x: closedObjPosition.x, y: 0.4, z: closedObjPosition.z},
                
//                     }
//                 })
//                 setRerender(value => value + 1)
//             }
        
//   };

  
//     useEffect(() => {
//         window.addEventListener("click", installModel)
//         video.pause()
//         createModelStatus()
//         return () => window.removeEventListener("click", installModel);
//     }, [
//         isFocused, 
//         video, 
//         video.paused, 
//         video.src,
//         installed,
//         scale,
//         rotateY,
//         position
//     ])

//     if(installed === true){
//         video.play()
        // return (
        //     <>
        //         <primitive 
        //             onClick={() => {
        //                 video.paused ? video.play() : video.pause()
        //             }} 
                    
        //             position={[position.x, position.y, position.z]} scale={scale} 
        //             object={gltf.scene} 
        //             rotation={[0, rotateY, 0]}
        //             onPointerOver={() => {
        //                 document.body.style.cursor = "pointer"
        //             }}
        //             onPointerOut={() => {
        //                 document.body.style.cursor = "default"
    
        //             }}
        //         />
        //             <mesh onClick={() => video.paused ? video.play() : video.pause()} scale={[scale * 25, scale * 15, scale* 25]} rotation={[0,rotateY+2 *3/4,0]} position={new Vector3(position.x,position.y+1 *5,position.z)}>
        //                 <planeBufferGeometry />
        //                 <meshBasicMaterial>
        //                     <videoTexture attach="map" args={[video]} />
        //                 </meshBasicMaterial>
        //             </mesh>
        //     </>
        // )
//     }
//     else{
//         video.pause()
//         return <></>
//     }
//   }

// export default TvModel;