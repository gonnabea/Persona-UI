//   const [loadingProgress, setLoadingProgress] = useState(0);
//   function Loader({setLoadingProgress}) {
//     const { active, progress, errors, item, loaded, total } = useProgress()
//     setLoadingProgress(progress)
//     console.log(active, progress, errors, item, loaded, total)
//     return <Html center>{progress} % loaded</Html>
//   }

import { Html, useProgress } from '@react-three/drei'
import { BoxCollider } from '../canvas/Colliders'
import Land from '../canvas/Land'
import PositionTracker from '../canvas/PositionTracker'
import SoccerBall from '../canvas/SoccerBall'
import SoccerField from '../canvas/SoccerField'
import { MyCharacter } from '../canvas/characters/MyCharacter'
import Player2Character from '../canvas/characters/worldCharacters/Player2'
import Player3Character from '../canvas/characters/worldCharacters/Player3'
import Player4Character from '../canvas/characters/worldCharacters/Player4'
import { Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()

  console.log(active, progress, errors, item, loaded, total)
  return (
    <Html center style={{ width: '300px' }}>
      {progress.toFixed(0)} % loaded
    </Html>
  )
}

const WorldItems = () => {
  const [userList, setUserList] = useState([])
  const colyseusRoom = useRecoilValue(colyseusRoomState)

  useEffect(() => {
    const onMoveCharacters = () => {
      colyseusRoom.onMessage('move', () => {
        setUserList(Array.from(colyseusRoom.state.players.$items.values()))
      })
    }

    onMoveCharacters()
  }, [colyseusRoom])

  return (
    <>
      <Suspense fallback={<Loader />}>
        {userList.map((user) => {
          const { username, positionX, positionY, positionZ, id } = user

          if (positionX && positionY && positionZ) {
            return (
              <Html position={[positionX, positionY, positionZ]} key={id}>
                <div>{username}</div>
              </Html>
            )
          }
          return ''
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
        <BoxCollider position={[-0.5, -1, 0]} args={[1000, 1, 1000]} isGround={true} visible={false} />

        <BoxCollider position={[16.035457210710149, -0.5, -60.83751896223613]} args={[3, 3, 50]} visible={true} />
        <BoxCollider position={[-17.035457210710149, -0.5, -60.83751896223613]} args={[3, 3, 50]} visible={true} />
        <BoxCollider position={[-0.7667139636867977, -0.5, -87.62388279411937]} args={[45, 3, 3]} visible={true} />
        <BoxCollider position={[-0.7667139636867977, -0.5, -34.62388279411937]} args={[45, 3, 0.2]} visible={true} />

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
      </Suspense>
    </>
  )
}

export default WorldItems
