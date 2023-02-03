import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import Button from '@/components/dom/Button'
import Input from '@/components/dom/Input'
import useInputEvent from '@/hooks/useInputEvent'
import useInput from '@/hooks/useInputEvent'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const [value, setValue] = useInput('')

  return (
    <Instructions>
      This is a minimal starter for Nextjs + React-three-fiber and Threejs. Click on the{' '}
      <span className='text-cyan-200'>atoms nucleus</span> to navigate to the{' '}
      <span className='text-green-200'>/blob</span> page. OrbitControls are enabled by default.
      <Button>Test</Button>
      <Input placeholder='입력' onChange={setValue} value={value} disabled />
    </Instructions>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Logo scale={0.5} route='/3dWorld' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
