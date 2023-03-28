import { Suspense } from 'react'
import Land from '@/components/canvas/Land'
import Amy from '@/components/canvas/characters/Amy'
import PositionTracker from '@/components/canvas/PositionTracker'
import { Physics } from '@react-three/cannon'
import { Chat } from '@/components/dom/ChatBox'
import { BoxCollider, SphereCollider } from '@/components/canvas/Colliders'
import Button from '@/components/dom/Button'
import Kebab from '@/assets/icons/kebab.svg'
import { ModalWithoutDim } from '@/components/dom/Modal'
import useToggle from '@/hooks/useToggle'
import LogoutIcon from '@/assets/icons/logout.svg'
import { useResetRecoilState } from 'recoil'
import authState, { keepSignInState } from '@/recoil/auth/atom'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here

export default function Page(props) {
  const [menuEnabled, toggleMenuEnabled] = useToggle(false)
  const resetToken = useResetRecoilState(authState)
  const resetKeepSignInStatus = useResetRecoilState(keepSignInState)
  const menuList = [
    {
      title: '로그아웃',
      Icon: LogoutIcon,
      callback: () => {
        resetToken()
        resetKeepSignInStatus()
      },
    },
  ]

  return (
    <>
      <Button
        color='white'
        className='absolute border rounded-full p-[8px] top-[34px] right-[40px] z-[1] border-[#B3B3B3] hover:bg-white'
        onClick={toggleMenuEnabled}>
        <Kebab className='fill-primary-200' />
      </Button>
      <Chat />
      <ModalWithoutDim
        active={menuEnabled}
        toggle={toggleMenuEnabled}
        containerClassName='top-[34px] right-[40px] z-[2] lg:w-[230px]'
        headerChildren={<>메뉴</>}
        bodyClassName='mx-[-10px] lg:mx-[-30px] lg:pb-0 lg:pt-[8px]'
        bodyChildren={
          <div className='flex flex-col'>
            {menuList.map((item, index) => {
              const { title, callback, Icon } = item
              return (
                <Button
                  key={`menu-${index}`}
                  color='white'
                  onClick={callback}
                  className='flex text-left rounded-none lg:px-[30px] lg:py-[10px] stroke-typo-black-primary hover:stroke-primary-200 stroke-2'>
                  {Icon ? <Icon /> : ''}
                  <p className='pl-[10px] text-inherit'>{title}</p>
                </Button>
              )
            })}
          </div>
        }
      />
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
          <Land position={[0, -1, 0]} rotation={[0, 0, 0]}></Land>
          <Amy scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]} />
          <BoxCollider position={[-0.5, -1, 0]} args={[1000, 1, 1000]} isGround={true} visible={false} />
          <BoxCollider position={[0, -1, 0]} rotation={[0, 0, 0]} args={[10, 5, 10]} isStair={true} />
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
  return { props: { title: '3dWorld' } }
}
