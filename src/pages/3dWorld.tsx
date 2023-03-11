import Land from '@/components/canvas/Land'
import Amy from '@/components/canvas/characters/Amy'
import PositionTracker from '@/components/canvas/PositionTracker'
import { Suspense, useContext, useEffect } from 'react'
import { Physics } from '@react-three/cannon'

import { Chat } from '@/components/dom/ChatBox'
import { BoxCollider, SphereCollider } from '@/components/canvas/Colliders'
import { useFrame } from '@react-three/fiber'

import { colyseusClient } from '@/colyseus'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here

export default function Page(props) {
  return (
    <>
      <Chat />
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => {
  return (
    <>
      <Physics gravity={[0, -100, 0]}>
        <Suspense fallback={null}>
        {/* <CastelModel /> */}
        <Land position={[0, -1, 0]} rotation={[0, 0, 0]}>

          
        </Land>
            <Amy scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]} />
            <BoxCollider 
              position={[-0.5, -1, 0]} 
              args={[1000, 1, 1000]} 
              isGround={true} 
              visible={false}
            />
            <BoxCollider 
              position={[0, -1, 0]} 
              rotation={[0, 0, 0]} 
              args={[10, 5, 10]} 
              isStair={true} 
            />
            <SphereCollider 
              position={[-1.693505738960225, -0.5, -7.033493077608636]} 
              rotation={[Math.PI / 4, 0, 0]}
              args={[0.3]} 
              type='Dynamic'
            />
                        <SphereCollider 
              position={[-1.693505738960225, -0.5, -7.033493077608636]} 
              rotation={[Math.PI / 4, 0, 0]}
              args={[0.3]} 
              type='Dynamic'
            />
          
                      <SphereCollider 
              position={[-1.693505738960225, -0.5, -7.033493077608636]} 
              rotation={[Math.PI / 4, 0, 0]}
              args={[0.3]} 
              type='Dynamic'
            />
          
          
       
        
        <PositionTracker />

          <PositionTracker />
        </Suspense>
      </Physics>
    </>
  )
}

export const getStaticProps = async () => {
  console.log(colyseusClient) // 나중에 Room 연결 후 prop으로 패스

  return { props: { title: '3dWorld' } }
}
