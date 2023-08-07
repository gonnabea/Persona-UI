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
import { TransformControls } from 'three-stdlib'

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

  return (
    <Html center className='fixed w-screen h-screen z-[999999]'>
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

        {/* 지형 콜라이더 */}
        <BoxCollider
          args={[100, 2, 1]}
          position={[-38.7878303527832, -0.6001151204109192, -87.49119567871094]}
          visible={false}
        />
        <BoxCollider
          args={[150, 2, 1]}
          position={[-38.7878303527832, -0.6001151204109192, -87.49119567871094]}
          rotation={[0, -100, 0]}
          visible={false}
        />
        <BoxCollider
          args={[1, 2, 30]}
          position={[-115.03746032714844, -0.6001151204109192, -56.58184814453125]}
          rotation={[0, 45, 0]}
          visible={false}
        />
        <BoxCollider
          args={[1, 2, 24]}
          position={[-127.9855499267578, -0.6001151204109192, -75.3402481079101]}
          visible={false}
        />
        <BoxCollider
          args={[12, 2, 1]}
          position={[-124.57302856445312, -0.6001151204109192, -92.36568450927734]}
          rotation={[0, -40, 0]}
          visible={false}
        />
        <BoxCollider
          args={[72, 2, 1]}
          position={[-92.6622085571289, -0.6001151204109192, -112.29365539550781]}
          rotation={[0, 10, 0]}
          visible={false}
        />
        <BoxCollider
          args={[1, 1, 20]}
          position={[-64.93544006347656, -0.6001151204109192, -140.5526123046875]}
          visible={false}
        />
        <BoxCollider
          args={[100, 1, 1]}
          position={[-99.98423767089844, -0.6001151204109192, -128.0631408691406]}
          rotation={[0, 10, 0]}
          visible={false}
        />
        <BoxCollider
          args={[1, 2, 50]}
          position={[-140.75332641601562, -0.6001151204109192, -75.62220001220703]}
          visible={false}
        />
        <BoxCollider
          args={[1, 2, 80]}
          position={[-130.6601104736328, -0.6001151204109192, -36.623260498046875]}
          rotation={[0, 10, 0]}
          visible={false}
        />
        <BoxCollider
          args={[1, 2, 100]}
          position={[-96.12845611572266, -0.6001151204109192, 5]}
          rotation={[0, 45, 0]}
          visible={false}
        />
        <BoxCollider
          args={[90, 1, 1]}
          position={[-15.332093238830566, -0.6001151204109192, 30.75225257873535]}
          visible={false}
        />
        <BoxCollider
          args={[100, 2, 1]}
          position={[55.73100280761719, -0.6001151204109192, 22.325807571411133]}
          rotation={[0, 60, 0]}
          visible={false}
        />
        <BoxCollider
          args={[20, 2, 1]}
          position={[111.57001495361328, -0.6001151204109192, 0.695167541503906]}
          rotation={[0, 10, 0]}
          visible={false}
        />
        <BoxCollider
          args={[100, 2, 1]}
          position={[135.5371856689453, -0.6001151204109192, -29.679838180541992]}
          rotation={[0, 45, 0]}
          visible={false}
        />
        <BoxCollider
          args={[50, 2, 1]}
          position={[140.64149475097656, -0.6001151204109192, -72.2412338256836]}
          visible={false}
        />
        <BoxCollider
          args={[1, 2, 10]}
          position={[119.33563232421875, -0.6001151204109192, -67.02662658691406]}
          visible={false}
        />
        <BoxCollider
          args={[20, 2, 1]}
          position={[115.18716430664062, -0.6001151204109192, -53.56449890136719]}
          rotation={[0, 20, 0]}
          visible={false}
        />
        <BoxCollider
          args={[70, 2, 1]}
          position={[30.11223030090332, -0.6001151204109192, -87.3530502319336]}
          visible={false}
        />
        <BoxCollider
          args={[30, 2, 1]}
          position={[66.8280258178711, -0.6001151204109192, -75.750129699707]}
          rotation={[0, 30, 0]}
          visible={false}
        />
        <BoxCollider
          args={[30, 2, 1]}
          position={[78.82693481445312, -0.6001151204109192, -54.15626525878906]}
          rotation={[0, -7, 0]}
          visible={false}
        />
        <BoxCollider
          args={[22, 2, 1]}
          position={[100.0007553100586, -0.6001151204109192, -45.634246826171875]}
          visible={false}
        />
      </Suspense>
    </>
  )
}

export default WorldItems
