import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import CastelModel from '@/components/canvas/Castel'
import Amy from "@/components/canvas/characters/Amy"
import PositionTracker from '@/components/canvas/positionTracker'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {
    return (
        <Instructions>
            3D World 페이지
        </Instructions>
    )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => {

    return (
        <>
            <CastelModel />
            <Amy scale={[0.005, 0.005, 0.005]} position={[-0.3, 0.75, 5]} />
            <PositionTracker />
        </>
    )
}

export async function getStaticProps() {
    return { props: { title: '3dWorld' } }
}
