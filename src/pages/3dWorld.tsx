import { Suspense, useEffect, useRef, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import MobileDetect from 'mobile-detect'

import Land from '@/components/canvas/Land'
import { MyCharacter } from '@/components/canvas/characters/MyCharacter'
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
// import Louise from '@/components/canvas/characters/Louise'
// import Mutant from '@/components/canvas/characters/Mutant'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import { colyseusPlayersState } from '@/recoil/colyseusPlayers/atom'
import { useRouter } from 'next/router'

import SoccerBall from '@/components/canvas/SoccerBall'
import SoccerField from '@/components/canvas/SoccerField'
import * as Colyseus from 'colyseus.js'
import Player4Character from '@/components/canvas/characters/worldCharacters/Player4'
import Player2Character from '@/components/canvas/characters/worldCharacters/Player2'
import Player3Character from '@/components/canvas/characters/worldCharacters/Player3'
import { toast } from 'react-toastify'
import BGM from '@/components/dom/BGM'
import PositionTracker from '@/components/canvas/PositionTracker'
import { Loader, useProgress } from '@react-three/drei'
import Cube from '@/components/dom/CubeLoader'
import WorldItems from '@/components/canvas/3dWorldItems'
import WallInstallPop from '@/components/dom/WallInstallPop'

import EditModeBtn from '@/components/dom/EditModeBtn'
import ChatIcon from '@/assets/icons/chat.svg'
import ItemInstallPop from '@/components/dom/ItemInstallPop'


// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here

// Colyseus functions
const colyseusClient = new Colyseus.Client(process.env.NEXT_PUBLIC_SOCKET_URL)
// const joinRoom = (roomName: string, options?: { [key: string]: any }) =>
//   colyseusClient.joinOrCreate(roomName, { accessToken: localStorage.getItem("accessToken"), ...options })

export default function Page(pageProps) {
  const router = useRouter()
  const [chatEnabled, setChatEnabled] = useRecoilState(chatEnabledState)
  const [menuEnabled, toggleMenuEnabled] = useToggle(false)
  const [colyseusRoom, setColyseusRoom] = useRecoilState(colyseusRoomState)
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
    const me = JSON.parse(localStorage.getItem('me'))
    // 본인이 colyseus 접속 시
    colyseusClient
      .joinOrCreate('main', {
        user: {
          email: me.data.email,
          username: me.data.username,
          character: me.character ? me.character : 'amy',
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
        onMoveCharacters(room) // 타 유저 캐릭터 이동 메세지 리스너 세팅 함수
        getColyseusSessionId(room)
        toast('네트워크 연결됨')
      })
      .catch((error) => {
        toast('네트워크 연결 실패')
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

  const toggleChatEnabled = (event) => {
    event.stopPropagation()
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
    const me = JSON.parse(localStorage.getItem('me'))

    // me 객체 자체가 없을 때 로그인 페이지로 이동
    if (!me) {
      router.push('/sign-in')
    }

    // me 객체 중에서 캐릭터 정보가 없으면 캐릭터 선택 페이지로 이동
    if (!me?.character) {
      router.push('/characters')
    }

    // me 객체 중에서 캐릭터 정보 있을 때만 colyseus 연결 시도
    if (me.character) {
      connectToColyseus()
    }
  }, [])

  useEffect(() => {
    // leave from room
    return () => {
      if (colyseusRoom) {
        colyseusRoom.leave()
      }
    }
  }, [colyseusRoom])

  return (
    <div className='[&>*]:select-none'>
      {/* 모바일 채팅버튼 */}
      {pageProps.isMobile ? (
        <Button
          color='white'
          className='absolute border rounded-full p-[8px] top-[20px] left-[20px] lg:top-[34px] lg:left-[40px] z-[2] border-[#B3B3B3] hover:bg-white'
          onClickCapture={toggleChatEnabled}
          onContextMenuCapture={(event) => {
            event.stopPropagation()
          }}>
          <ChatIcon className='fill-primary-200' />
        </Button>
      ) : (
        ''
      )}
      <Button
        color='white'
        className='absolute border rounded-full p-[8px] top-[20px] right-[20px] lg:top-[34px] lg:right-[40px] z-[2] border-[#B3B3B3] hover:bg-white'
        onClickCapture={(event) => {
          event.stopPropagation()
          toggleMenuEnabled()
        }}
        onContextMenuCapture={(event) => {
          event.stopPropagation()
          event.preventDefault()
        }}>
        <Kebab className='fill-primary-200' />
      </Button>
      <BGM />
      <EditModeBtn />
      <WallInstallPop itemName={'벽설치'} />
      <ItemInstallPop furnitures={
      <div className='flex flex-col items-center cursor-pointer'>
        <img src="/models/exterior_items/images/door_1.png" style={{width: 125, height: 125}}/>
        <span>door_1</span>
      </div>} />
      <Chat isMobile={pageProps.isMobile} />
      {/* 모바일 조이스틱 */}
      {pageProps.isMobile ? (
        <div  className='absolute bottom-[30px] left-[30px] z-[2]'>
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
      <div style={{ position: 'absolute', fontSize: '24px', zIndex: 999 }}>
        {/* <Cube 
        width={'100px'}
        front={
          <div style={{
            backgroundColor:'black',
            color: 'white', 
            display: 'flex', 
            justifyContent:'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100%',
            fontSize: '30px',
            fontWeight: 'bold',
            border: 'solid 1px black',
            boxShadow: '0px 10px 20px 2px rgba(0, 255, 255, 0.5)'
          }}>{ loader ? loader.loadingProgress : null}</div>
        }
      /> */}
      </div>
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (pageProps) => {
  console.log(pageProps)

  return (
    <>
      <Physics gravity={[0, -100, 0]}>
        <Suspense fallback={null}>
          <WorldItems />

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
