import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const CharacterGroup = (props) => {
  const [colyseusRoom, _] = useRecoilState(colyseusRoomState)
  const [otherUsers, setOtherUSers] = useState(null)

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
    // colyseusRoom.onMessage("move", (message) => {
    //   const me = JSON.parse(localStorage.getItem("me"))
    //   const usersArr = Array.from(colyseusRoom.state.players.$items.values())
    //   const otherUsers = usersArr.filter(player => player.key !== me.colyseusSessionId)
    //   setOtherUSers(otherUsers)
    // })
  }

  return <></>
}
export default CharacterGroup
