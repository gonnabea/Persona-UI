import Land from '@/components/canvas/Land'
import Amy from '@/components/canvas/characters/Amy'
import PositionTracker from '@/components/canvas/PositionTracker'
import { Suspense, useContext, useEffect } from 'react'
import { Physics } from '@react-three/cannon'

import { Chat } from '@/components/dom/ChatBox'
import ObstacleBox from '@/components/canvas/ObstacleBox'
import { ColyseusContext } from '@/context/Colyseus'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here

export default function Page(props) {
  const colyseusClient = useContext(ColyseusContext)

  useEffect(() => {
    console.log(colyseusClient)
  }, [colyseusClient])

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
          <Land position={[0, -1, 0]} rotation={[0, 0, 0]} />
          <Amy scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} />
          <ObstacleBox position={[-0.5, -1, 0]} args={[1000, 1, 1000]} isGround={true} />
          {/* x
                :
                -4.01553024951554
                y
                :
                -0.7347574932435966
                z
                :
                -8.09126259150486 */}

          <PositionTracker />
        </Suspense>
      </Physics>
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: '3dWorld' } }
}
