import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import CastelModel from '@/components/canvas/Castel'

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
Page.canvas = (props) => <CastelModel />

export async function getStaticProps() {
    return { props: { title: '3dWorld' } }
}
