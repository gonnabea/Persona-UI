import dynamic from 'next/dynamic'
import Button from '@/components/dom/Button'
import Link from 'next/link'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page() {
  return (
    <div className='absolute top-0 left-0 right-0 z-20 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center bg-white gap-y-3 p-[12px]'>
        <Link href='/3dWorld' className='w-full'>
          <Button color='primary' className='w-full'>
            3dWorld
          </Button>
        </Link>
        <Link href='/signin' className='w-full'>
          <Button color='primary' className='w-full'>
            로그인
          </Button>
        </Link>
        <Link href='/signup' className='w-full'>
          <Button color='primary' className='w-full'>
            회원가입 (이용약관)
          </Button>
        </Link>
        <Link href='/signup/create' className='w-full'>
          <Button color='primary' className='w-full'>
            회원가입 (정보 입력)
          </Button>
        </Link>
        <Link href='/characters' className='w-full'>
          <Button color='primary' className='w-full'>
            캐릭터 목록
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Logo scale={0.5} route='/3dWorld' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
