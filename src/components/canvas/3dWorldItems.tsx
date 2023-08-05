//   const [loadingProgress, setLoadingProgress] = useState(0);
//   function Loader({setLoadingProgress}) {
//     const { active, progress, errors, item, loaded, total } = useProgress()
//     setLoadingProgress(progress)
//     console.log(active, progress, errors, item, loaded, total)
//     return <Html center>{progress} % loaded</Html>
//   }

import { Html, useProgress } from '@react-three/drei'
import { BoxCollider } from './Colliders'
import Land from './Land'
import PositionTracker from './PositionTracker'
import SoccerBall from './SoccerBall'
import SoccerField from './SoccerField'
import { MyCharacter } from './characters/MyCharacter'
import Player2Character from './characters/worldCharacters/Player2'
import Player3Character from './characters/worldCharacters/Player3'
import Player4Character from './characters/worldCharacters/Player4'
import { Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import Wall from './Wall'
import SoccerTrophy from './SoccerTrophy'
import ScreenModel from './ScreenModel'
import NamePlate from './NamePlate'
import ChatBubble from './ChatBubble'
import BlockGroup from './BlockGroup'
import Door1 from './exteriorItems/Door1'
import Roof1 from './exteriorItems/Roof1'
import Floor1 from './exteriorItems/Floor1'
import Window1 from './exteriorItems/Window1'
import Bed1 from './interiorItems/Bed1'
import InstallArea from './exteriorItems/InstallArea'
import PersonaIcon from '@/assets/icons/persona-icon.svg'
import TV1 from './interiorItems/TV1'
import Lamp2 from './interiorItems/Lamp2'
import Box1 from './interiorItems/Box1'
import CoffeeTable1 from './interiorItems/CoffeTable1'
import Flower1 from './interiorItems/Flower1'
import Fridge1 from './interiorItems/Fridge1'
import KitchenChair1 from './interiorItems/KitchenChair1'
import MicrowaveOven1 from './interiorItems/MicrowaveOven1'
import Sofa1 from './interiorItems/Sofa1'
import TrainingItem1 from './interiorItems/TraningItem1'
import TrainingItem2 from './interiorItems/TrainingItem2'
import WashingMachine1 from './interiorItems/WashingMachine1'
import Camera1 from './interiorItems/Camera1'
import Floor from './Floor'

type User = {
  character: string
  email: string
  id: string
  isAttacking: boolean
  positionX: number
  positionY: number
  positionZ: number
  rotationZ: number
  username: string
}

interface Chat extends User {
  chatMessage: string
}

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()

  console.log(active, progress, errors, item, loaded, total)
  return (
    <Html center className='fixed w-screen h-screen'>
      <div className='flex flex-col w-full h-full bg-center bg-[url("/img/loading-bg.png")]'>
        {/* Content container (팁, 로딩 인디케이터 출력 컨테이너) */}
        <div className='flex items-end justify-between flex-1 from-[#121130] bg-gradient-to-t p-[20px] lg:p-[40px]'>
          {/* 팁 */}
          <div className='flex flex-col [&>*]:text-white'>
            <p className='uppercase font-[900]'>tip</p>
            <p>현재 구동중인 PERSONA는 시연용이므로 일부 기능이 불안정하거나 동작하지 않을 수 있습니다.</p>
          </div>
          {/* 로딩 인디케이터 */}
          <div className='flex items-center [&>*]:text-white'>
            <PersonaIcon fill='#fff' className='w-[20px] h-[20px] mr-[4px] lg:w-[28px] lg:h-[28px] lg:mr-[10px] ' />
            <p className='uppercase font-[900]'>loading...</p>
          </div>
        </div>
        {/* Progress bar container */}
        <div className='w-full bg-black h-[10px]'>
          {/* Progress bar */}
          <div className='h-full bg-white' style={{ width: `${progress.toFixed(0)}%` }}></div>
        </div>
      </div>
    </Html>
  )
}

const WorldItems = () => {
  const [otherUserList, setOtherUserList] = useState<User[]>([])
  const [chatList, setChatList] = useState<{ [key: string]: Chat }>({})
  const colyseusRoom = useRecoilValue(colyseusRoomState)

  useEffect(() => {
    // move 이벤트
    colyseusRoom?.onMessage('move', () => {
      // 나의 정보
      const me = JSON.parse(localStorage.getItem('me'))
      if (me) {
        const myClientId = me.colyseusSessionId

        console.log(Array.from(colyseusRoom.state.players.$items.values()))

        // 나의 정보를 제외하고 다른 유저의 정보를 State로 지정함
        setOtherUserList(
          Array.from(colyseusRoom.state.players.$items.values()).filter((user: User) => {
            if (user.id !== myClientId) {
              return user
            }
          }) as User[],
        )
      }
    })
    // 채팅 이벤트
    colyseusRoom?.onMessage('chat', (client) => {
      setChatList((prevState) => {
        return { ...prevState, [client.id]: client }
      })
    })

    // 사용자 퇴장 이벤트 (퇴장 시 닉네임 표시 삭제)
    colyseusRoom?.onMessage('leave', (client) => {
      setOtherUserList((prevState) => {
        return prevState.filter((otherUser) => otherUser.username !== client.username)
      })
    })

    // 최초 랜더링 시 기존 사용자의 위치 얻어오기
    if (colyseusRoom) {
      // 나의 정보
      const me = JSON.parse(localStorage.getItem('me'))
      if (me) {
        const myClientId = me.colyseusSessionId

        // 나의 정보를 제외하고 다른 유저의 정보를 State로 지정함
        setOtherUserList(
          Array.from(colyseusRoom.state.players.$items.values()).filter((user: User) => {
            if (user.id !== myClientId) {
              return user
            }
          }) as User[],
        )
      }
    }
    // 새로운 유저가 들어왔을 때 사용자의 위치 얻어오기
    colyseusRoom?.onMessage('join', (client) => {
      setOtherUserList((prevState) => {
        return [...prevState, client]
      })
    })
  }, [colyseusRoom])

  return (
    <>
      <Suspense fallback={<Loader />}>
        {/* 다른 유저의 닉네임 출력 */}
        {/* TODO: 나중에 플레이어 컴포넌트가 통합된다면 플레이어 컴포넌트로 이동 */}
        {otherUserList.map((user) => {
          console.log(user)
          const { username, positionX, positionY, positionZ, id } = user

          if (positionX && positionY && positionZ) {
            return (
              <NamePlate
                positionX={positionX + 0.5}
                positionY={positionY + 2.5}
                positionZ={positionZ}
                username={username}
                key={id}
              />
            )
          }

          return ''
        })}

        {/* 채팅 말풍선 */}
        {otherUserList.map((user) => {
          const { positionX, positionY, positionZ, id, username } = user
          const chatMessage = chatList[id]?.chatMessage

          if (positionX && positionY && positionZ && chatMessage) {
            return (
              <ChatBubble
                positionX={positionX + 0.5}
                positionY={positionY + 3.5}
                positionZ={positionZ}
                username={username}
                text={chatMessage}
                key={id}
              />
            )
          }
        })}

        <Land></Land>
        <SoccerField></SoccerField>
        <MyCharacter />
        <Player2Character />
        <Player3Character />
        <Player4Character />
        <PositionTracker />
        {/* <OtherUserAmy /> */}
        {/* <WorldLouise />
          <WorldMutant /> */}
        {/* <Louise scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]} />
          <Mutant scale={[0.01,0.01,0.01]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 6, 5]} />   */}
        {/* <CharacterGroup /> */}
        {/* <AmyOthers /> */}
        <BoxCollider position={[-0.5, -1.5, 0]} args={[1000, 1, 1000]} isGround={true} visible={false} />

        {/* 축구장 벽 콜라이더 */}
        <BoxCollider position={[16.035457210710149, -0.5, -60.83751896223613]} args={[3, 3, 50]} visible={false} />
        <BoxCollider position={[-17.035457210710149, -0.5, -60.83751896223613]} args={[3, 3, 50]} visible={false} />
        <BoxCollider position={[-0.7667139636867977, -0.5, -87.62388279411937]} args={[35, 3, 3]} visible={false} />
        <BoxCollider position={[0.7667139636867977, -0.5, -34.62388279411937]} args={[35, 3, 0.2]} visible={false} />

        <SoccerTrophy />

        {/* 투명 벽 */}
        <Wall />

        <Floor />
        {/* <BlockGroup /> 원래 주석처리됨.. */}

        <ScreenModel />

        {/* 투명 벽 */}
        <Door1 />
        <Roof1 />
        <Floor1 />
        <Window1 />
        <Bed1 />
        <TV1 />
        <Lamp2 />
        <Box1 />
        <CoffeeTable1 />
        <Flower1 />
        <Fridge1 />
        <KitchenChair1 />
        <MicrowaveOven1 />
        <Sofa1 />
        <TrainingItem1 />
        <TrainingItem2 />
        <WashingMachine1 />
        <Camera1 />

        {/* <InstallArea /> */}

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
      </Suspense>
    </>
  )
}

export default WorldItems
