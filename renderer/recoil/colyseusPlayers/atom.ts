import { atom } from 'recoil'

export const colyseusPlayersState = atom({
  key: 'colyseusPlayers',
//   데이터 형태
// 
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
  default: [  {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationZ: 0,
    user: {
     email: "",
     username: "",
     colyseusClientId: ""
    } 
  }],
  dangerouslyAllowMutability: true
})
