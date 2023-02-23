import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import CastelModel from '@/components/canvas/Castel'
import Amy from "@/components/canvas/characters/Amy"
import PositionTracker from '@/components/canvas/PositionTracker'
import * as Colyseus from "colyseus.js";
import { useState } from 'react'
import { Physics } from '@react-three/cannon'


const client = new Colyseus.Client('ws://localhost:4001');

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {
    const [characterPosition, setCharacterPosition] = useState([0, 0, 0]);

    return (
        <>3D World 페이지</>
    )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => {

    return (
        <>
            <Physics
                gravity={[0, -9.81, 0]}
                size={1000}
            >
                <CastelModel />
                <Amy scale={[0.05, 0.05, 0.05]} position={[-0.3, 0.8, 5]} />
                <PositionTracker />
            </Physics>

        </>
    )
}

export async function getStaticProps() {
    return { props: { title: '3dWorld' } }
}
