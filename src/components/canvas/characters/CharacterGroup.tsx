import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import Amy from './Amy'
import AmyOthers from './worldCharacters/AmyOhters'
// import Ferret from './Model'
// import { Schema as ColyseusSchema } from "@colyseus/schema";
// let characters = []
const CharacterGroup = (props) => {
  const group = useRef()
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)
  const [otherUsers, setOtherUSers] = useState(null);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    onMoveCharacters()
  }, [colyseusRoom])
  const onMoveCharacters = () => {
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
    colyseusRoom.onMessage("move", (message) => {
      // console.log(message)
      // console.log(room)
      // console.log(colyseusPlayers)
      // console.log(message);
      // console.log(colyseusRoom.state.players.$items)
      const me = JSON.parse(localStorage.getItem("me"))
      const usersArr = Array.from(colyseusRoom.state.players.$items.values())
      // console.log(usersArr)
      const otherUsers = usersArr.filter(player => player.key !== me.colyseusSessionId)
      // console.log(otherUsers)
      setOtherUSers(otherUsers)
    })
  }
  // useEffect(() => {
  //   console.log(characters)
  //   setCharacters([])
  //   for (let i = 0; i < otherUsers?.length; i++) {
  //     setCharacters([...characters, <Amy
  //       key={'Amy' + i}
  //       // position={[
  //       //   Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250)),
  //       //   -2.5,
  //       //   Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250))
  //       // ]}
  //       positionX={otherUsers[i]?.positionX}
  //       positionY={otherUsers[i]?.positionY}
  //       positionZ={otherUsers[i]?.positionZ}
  //       rotationZ={otherUsers[i]?.rotationZ}
  //       isMyCharacter={false}
  //     />])
  //   }
  //   // characters.push(
  //   //   <Amy
  //   //     key={'Amy' + i}
  //   //     // position={[
  //   //     //   Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250)),
  //   //     //   -2.5,
  //   //     //   Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250))
  //   //     // ]}
  //   //     positionX={otherUsers[i]?.positionX}
  //   //     positionY={otherUsers[i]?.positionY}
  //   //     positionZ={otherUsers[i]?.positionZ}
  //   //     rotationZ={otherUsers[i]?.rotationZ}
  //   //     isMyCharacter={false}
  //   //   />
  //   // )
  // }, [otherUsers])
  return (
    <>
      {/* {characters} */}
      {/* {otherUsers?.map((colyseusUser, index: number) => {
        return (
          <Amy
            key={'Amy' + index}
            // position={[
            //   Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250)),
            //   -2.5,
            //   Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250))
            // ]}
            positionX={otherUsers[index]?.positionX}
            positionY={otherUsers[index]?.positionY}
            positionZ={otherUsers[index]?.positionZ}
            rotationZ={otherUsers[index]?.rotationZ}
            isMyCharacter={false}
          />
        )
      })} */}
    
    </>
  )
}
export default CharacterGroup