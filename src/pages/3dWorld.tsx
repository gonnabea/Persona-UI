import { Suspense, useEffect, useRef, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import MobileDetect from 'mobile-detect'

import Land from '@/components/canvas/Land'
import {Amy, OtherUserAmy} from '@/components/canvas/characters/MyCharacter'
import PositionTracker from '@/components/canvas/PositionTracker'
import { Physics } from '@react-three/cannon'
import { Chat } from '@/components/dom/ChatBox'
import { BoxCollider, SphereCollider } from '@/components/canvas/Colliders'
import Button from '@/components/dom/Button'
import Kebab from '@/assets/icons/kebab.svg'
import { ModalWithoutDim } from '@/components/dom/Modal'
import useToggle from '@/hooks/useToggle'
import LogoutIcon from '@/assets/icons/logout.svg'
import { useRecoilState } from 'recoil'
import { chatEnabledState } from '@/recoil/chat/atom'
import Louise from '@/components/canvas/characters/Louise'
import Mutant from '@/components/canvas/characters/Mutant'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { colyseusPlayersState } from '@/recoil/colyseusPlayers/atom'
import { useRouter } from 'next/router'

import SoccerBall from '@/components/canvas/SoccerBall'
import SoccerField from '@/components/canvas/SoccerField'
import * as Colyseus from 'colyseus.js'
import Player4Character from '@/components/canvas/characters/worldCharacters/Player4'
import Player2Character from '@/components/canvas/characters/worldCharacters/Player2'
import Player3Character from '@/components/canvas/characters/worldCharacters/Player3'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here

// Colyseus functions
const colyseusClient = new Colyseus.Client(process.env.NEXT_PUBLIC_SOCKET_URL)
// const joinRoom = (roomName: string, options?: { [key: string]: any }) =>
//   colyseusClient.joinOrCreate(roomName, { accessToken: localStorage.getItem("accessToken"), ...options })

export default function Page({ isMobile }) {
  const router = useRouter()
  const [chatEnabled, setChatEnabled] = useRecoilState(chatEnabledState)
  const [menuEnabled, toggleMenuEnabled] = useToggle(false)
  const [_, setColyseusRoom] = useRecoilState(colyseusRoomState)
  // 웹소켓으로 통신할 유저정보 (position, rotation ...)
  const [colyseusPlayers, setColyseusPlayers] = useRecoilState(colyseusPlayersState)

  const menuList = [
    {
      title: '로그아웃',
      Icon: LogoutIcon,
      callback: () => {
        localStorage.removeItem('me')
        router.push('/signin')
      },
    },
  ]

  const connectToColyseus = () => {
    // alert('colyseusConnected')
    const me = JSON.parse(localStorage.getItem('me'))
    // 본인이 colyseus 접속 시
    colyseusClient
      .joinOrCreate('main', {
        user: {
          email: me.email,
          username: me.username,
          character: 'amy'
        }, // amy || mutant || Louise ...
      })
      .then((room) => {
        console.log(room)

        // const me = JSON.parse(localStorage.getItem("me"));
        // // 접속 시 서버에 유저정보 넘겨주기
        // room.send("join", {
        //   email: me.email,
        //   username: me.username,
        // })

        setColyseusRoom(room) // 전역 store에 연결된 coyseus room 담기
        onColyseusConnection(room) // 타 유저 colysus room 접속 시 처리 함수
        // onMoveCharacters(room); // 타 유저 캐릭터 이동 메세지 리스너 세팅 함수
        getColyseusSessionId(room)
      })
  }

  const getColyseusSessionId = (room) => {
    room.onMessage('getSessionId', (sessionId) => {
      const me = JSON.parse(localStorage.getItem('me'))
      localStorage.setItem('me', JSON.stringify({ ...me, colyseusSessionId: sessionId }))
    })
  }

  // 타 유저 실시간 연동 접속 시
  const onColyseusConnection = (room) => {
    room.onMessage('join', (message) => {
      // store에 해당 player 상태 객체 추가.
      const newColyseusPlayer = message
      setColyseusPlayers([...colyseusPlayers, newColyseusPlayer])
      console.log(colyseusPlayers)
    })
  }

  const onMoveCharacters = (room) => {
    //   데이터 형태

    // {
    //   positionX: 0,
    //   positionY: 0,
    //   positionZ: 0,
    //   rotationZ: 0,
    //   user: {
    //    email,
    //    username
    //   }
    // }

    // 타 유저 캐릭터 이동 메세지 리스너
    room.onMessage('move', (message) => {
      // console.log(message)
      // console.log(room)
      // console.log(colyseusPlayers)
      // console.log(message);

      const me = JSON.parse(localStorage.getItem('me'))
      const usersArr = Array.from(room.state.players.$items.values())

      const otherUsers = usersArr.filter((player) => player.key !== me.colyseusClientId)
    })
  }

  const toggleChatEnabled = () => {
    setChatEnabled(!chatEnabled)
  }

  // 조이스틱 이벤트
  const joystickMoveEvent = (event) => {
    const direction = event.direction

    const arrowKeys = {
      FORWARD: { code: 'KeyW', key: 'w' },
      BACKWARD: { code: 'KeyS', key: 's' },
      LEFT: { code: 'KeyA', key: 'a' },
      RIGHT: { code: 'KeyD', key: 'd' },
    }

    for (const [key, value] of Object.entries(arrowKeys)) {
      if (key === direction) {
        document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...value }))
      } else {
        document.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true, ...value }))
      }
    }
  }

  useEffect(() => {
    connectToColyseus()
  }, [])

  return (
    <>
      {/* 모바일 채팅버튼 */}
      {isMobile ? (
        <Button
          color='white'
          onClick={toggleChatEnabled}
          className='absolute border rounded-full p-[8px] top-[20px] left-[20px] lg:top-[34px] lg:left-[40px] z-[1] border-[#B3B3B3] hover:bg-white'>
          <Kebab className='fill-primary-200' />
        </Button>
      ) : (
        ''
      )}
      <Button
        color='white'
        className='absolute border rounded-full p-[8px] top-[20px] right-[20px] lg:top-[34px] lg:right-[40px] z-[1] border-[#B3B3B3] hover:bg-white'
        onClick={toggleMenuEnabled}>
        <Kebab className='fill-primary-200' />
      </Button>
      <Chat isMobile={isMobile} />
      {/* 모바일 조이스틱 */}
      {isMobile ? (
        <div className='absolute bottom-[30px] left-[30px] z-[2]'>
          <Joystick
            size={120}
            stickSize={60}
            baseColor='rgba(247, 247, 247, 0.5)'
            stickColor='#808080'
            move={joystickMoveEvent}
            stop={joystickMoveEvent}
            throttle={100}
          />
        </div>
      ) : (
        ''
      )}
      <ModalWithoutDim
        active={menuEnabled}
        toggle={toggleMenuEnabled}
        containerClassName='top-[20px] right-[20px] lg:top-[34px] lg:right-[40px] z-[2] lg:w-[230px]'
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
          <Land></Land>
          <SoccerField></SoccerField>
          <Amy />
          <Player2Character />
          <Player3Character />
          <Player4Character />
          {/* <OtherUserAmy /> */}
          {/* <WorldLouise />
          <WorldMutant /> */}
          {/* <Louise scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]} />
          <Mutant scale={[0.01,0.01,0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]} />   */}
          {/* <CharacterGroup /> */}
          {/* <AmyOthers /> */}
          <BoxCollider position={[-0.5, -1, 0]} args={[1000, 1, 1000]} isGround={true} visible={false} />
          {/* <BoxCollider position={[0, -1, 0]} rotation={[0, 0, 0]} args={[10, 5, 10]} isStair={true} visible={false} /> */}
          {/* <SphereCollider
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
          /> */}

          <SoccerBall />

          <PositionTracker />

          {/* <object3D name={'dirLightTarget'} position={[-4, 0, 0]} />
      <directionalLight  position={[0, 0, 0]} intensity={11} target={'dirLightTarget'} /> */}
        </Suspense>
      </Physics>
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  const userAgent = req.headers['user-agent']
  const md = new MobileDetect(userAgent)

  return { props: { title: '3dWorld', isMobile: !!md.mobile() } }
}
