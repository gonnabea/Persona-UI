import dynamic from 'next/dynamic'
import CastelModel from '@/components/canvas/Castel'
import Land from '@/components/canvas/Land'
import Amy from '@/components/canvas/characters/Amy'
import PositionTracker from '@/components/canvas/PositionTracker'
import * as Colyseus from 'colyseus.js'
import { Suspense, useState } from 'react'
import { Physics } from '@react-three/cannon'

import { Chat } from '@/components/dom/ChatBox'
import { BoxCollider, SphereCollider } from '@/components/canvas/Colliders'
import { useFrame } from '@react-three/fiber'

const client = new Colyseus.Client('ws://localhost:4001')

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here
export default function Page(props) {
  const [characterPosition, setCharacterPosition] = useState([0, 0, 0])

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

        </Suspense>
      </Physics>
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: '3dWorld' } }
}
