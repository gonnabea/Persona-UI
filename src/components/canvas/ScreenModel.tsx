import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { Text, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import * as THREE from 'three'

type ScoreType = {
  clientId: string
  message: {
    id: string
    team1: number
    team2: number
  }
}

function ScreenModel(props) {
  const group = useRef()
  const gltf = useGLTF('/models/tv.glb')
  const colyseusRoom = useRecoilValue(colyseusRoomState)
  const texture = useLoader(THREE.TextureLoader, '/img/scoreboard.png')
  const [score, setScore] = useState<ScoreType>({
    clientId: '',
    message: {
      id: '',
      team1: 0,
      team2: 0,
    },
  })

  useEffect(() => {
    if (colyseusRoom) {
      colyseusRoom.onMessage('soccerScore', (message) => {
        setScore(message)
        console.log(message)
      })

      // console.log(Array.from(colyseusRoom.state.soccerScores.$items.values())[0].id)

      setScore((prevState) => {
        return {
          ...prevState,
          message: {
            id: Array.from(colyseusRoom.state.soccerScores.$items.values())[0].id || ('' as string),
            team1: Array.from(colyseusRoom.state.soccerScores.$items.values())[0].team1 || (0 as Number),
            team2: Array.from(colyseusRoom.state.soccerScores.$items.values())[0].team2 || (0 as Number),
          },
        }
      })
    }
  }, [])

  return (
    <>
      <group
        position={[30.022834499063098, -2, -20.51774623131295]}
        scale={[1.5, 1.2, 1]}
        rotation={[0, 3.8, 0]}
        ref={group}>
        <primitive object={gltf.scene} />
        {/* <mesh scale={[16, 9, 0.1]} position={[0, 6.5, 3]}>
          <planeBufferGeometry />
          <meshStandardMaterial color='orange' />
        </mesh> */}

        {/* 전광판 1 */}
        <mesh position={[0, 6.5, 3]}>
          <Text position={[-1.5, 0, 0.2]} characters='abcdefghijklmnopqrstuvwxyz0123456789!' scale={[2, 2, 2]}>
            {score.message?.team2 ?? 0}
          </Text>
          <Text position={[0, 0, 0.2]} characters='abcdefghijklmnopqrstuvwxyz0123456789!' scale={[2, 2, 2]}>
            :
          </Text>
          <Text position={[1.5, 0, 0.2]} characters='abcdefghijklmnopqrstuvwxyz0123456789!' scale={[2, 2, 2]}>
            {score.message?.team1 ?? 0}
          </Text>
          <boxGeometry args={[16, 9, 0.1]} />
          <meshStandardMaterial attach='material' map={texture} />
        </mesh>
        {/* 전광판 뒷편 */}
        <mesh position={[0, 6.5, 2]}>
          <boxGeometry args={[16, 9, 0.1]} />
          <meshStandardMaterial color='black' />
        </mesh>
      </group>
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
