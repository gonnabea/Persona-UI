import { Canvas, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Amy } from './characters/MyCharacter'
import AmyOther from './characters/worldCharacters/Player2'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { useRecoilState } from 'recoil'



export default function Characters({ children, ...props }) {
  const [colyseusRoom, setColyseusRoom] = useRecoilState(colyseusRoomState)


  // const { scene } = useThree();

  useEffect(() => {
    colyseusRoom.onMessage('join', (room) => {
      console.log(room)
    })
    // setTimeout(() => {
    //   directionalLight.current['intensity'] = 11;
    // }, 5000)
    // console.log(directionalLight)
    // const scene = sceneRef.current
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // sceneRef.current.add( directionalLight );
  }, [])
 
  // Everything defined in here will persist between route changes, only children are swapped
  return <>
          <Amy />
          <AmyOther />

  </>
}
