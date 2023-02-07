import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import Button from '@/components/dom/Button'
import { useRouter } from 'next/router'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page() {
  const router = useRouter()

  const moveToWorld = () => {
    router.push('/3dWorld')
  }

  const moveToSignIn = () => {
    router.push('/signin')
  }

  return (
    <Instructions>
      <Button color='primary' onClick={moveToWorld}>
        3D World
      </Button>
      <Button color='primary' onClick={moveToSignIn}>
        인증 페이지
      </Button>

      {/* <Button>Test</Button> */}
      {/* <Input placeholder='입력' onChange={setValue} value={value} disabled /> */}
      {/* <Checkbox onChange={setToggle} checked={toggle} /> */}
    </Instructions>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Logo scale={0.5} route='/3dWorld' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
